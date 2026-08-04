# CLAUDE.md

Tento soubor poskytuje pokyny nástroji Claude Code (claude.ai/code) pro práci s kódem v tomto repozitáři.

## Přehled projektu

OptikSW je systém pro správu zakázek/zákazníků optiky (zakázky na brýle, refrakce, zákazníci). Uživatelské rozhraní je v češtině. Skládá se z .NET backendu (ASP.NET Core Web API + EF Core) a frontendu Vite/React (SPA) stylovaného pomocí admin šablony SmartAdmin.

## Struktura repozitáře — aktivní vs. legacy projekty

Aktivně se vyvíjí pouze projekty uvedené v `OptikSW.sln`. Vše ostatní bylo jednorázově vygenerováno (jediný commit "Add project files.") a od té doby se nikdy neměnilo — **na těchto projektech nestavte, pokud si to uživatel výslovně nevyžádá**:

Aktivní (v `OptikSW.sln`):
- `OptikSW.Core` — obecná rozhraní/rozšíření pro repozitáře (namespace `OptikSW.Domain.Interfaces`/`OptikSW.Core`, i přes odlišný název projektu).
- `OptikSW.Domain` — doménové entity, rozhraní repozitářů pro jednotlivé moduly, filtry (namespace `OptikSW.Domain.Modules.*`).
- `OptikSW.Infrastructure` — EF Core `DbContext`, konfigurace entit, implementace repozitářů, migrace.
- `OptikSW.Data.Sql` — databázový projekt SQL Server (`.sqlproj`) s několika skalárními T-SQL funkcemi (odstranění diakritiky/speciálních znaků, hledání jmen), které žijí v DB místo v EF.
- `OptikSW.Web.API` — ASP.NET Core Web API (controllery, request/response modely).
- `optiksw.web.react` — aktivní frontend (Vite + React + TypeScript), obsluhovaný/proxovaný z projektu API.

Legacy/nepoužívané (nejsou v solution, needitovat, pokud o to uživatel výslovně nepožádá):
- `OptikSW.BusinessLayer`, `OptikSW.DataServer` — starší, opuštěná vrstva repozitářů/DbContextu, nahrazená projektem `OptikSW.Infrastructure`.
- `optik-sw-web` — opuštěný scaffold Angular CLI.
- `_OptikSW.Web.React` — opuštěný scaffold Create-React-App + ASP.NET "React template", nahrazený projektem `optiksw.web.react`.

V současnosti neexistuje žádná automatizovaná sada testů pro backend ani frontend (jediné soubory připomínající testy jsou výchozí boilerplate z Create React App `App.test.tsx`/`setupTests.js` v `optiksw.web.react`, které nejsou součástí žádného workflow).

## Příkazy

Backend (spouštět z kořene repozitáře nebo z příslušné složky projektu):
```
dotnet build OptikSW.sln          # sestavení celého řešení
dotnet run --project OptikSW.Web.API   # spuštění API (Swagger UI na /swagger)
dotnet ef migrations add <Name> --project OptikSW.Infrastructure --startup-project OptikSW.Web.API
dotnet ef database update --project OptikSW.Infrastructure --startup-project OptikSW.Web.API
```
API v dev prostředí naslouchá na `https://localhost:7284` / `http://localhost:5022` (viz `OptikSW.Web.API/Properties/launchSettings.json`) a tato URL je natvrdo zapsaná jako `config.baseUrl` v React aplikaci (`optiksw.web.react/src/config.ts`) — pokud se port změní, aktualizujte obě místa současně.

Connection string k SQL Serveru **není** v `appsettings.json` (ten je sdílený v repozitáři) — klíč `ConnectionStrings:connection` je tam záměrně prázdný. Skutečná hodnota se nastavuje lokálně přes .NET User Secrets (mimo repozitář):
```
cd OptikSW.Web.API
dotnet user-secrets set "ConnectionStrings:connection" "Server=...; Database=OptikSW; User Id=...; Password=...; TrustServerCertificate=True;"
```
V produkci se stejný klíč typicky přepíše přes proměnnou prostředí `ConnectionStrings__connection`.

Frontend (`cd optiksw.web.react`):
```
npm run dev       # vite dev server (mimo jiné generuje/používá HTTPS certifikát z ASP.NET dev-certs, viz vite.config.ts)
npm run build     # tsc && vite build -> dist/
npm run lint      # eslint
```

## Architektura backendu

Vrstvení jde Core → Domain → Infrastructure → Web.API:
- **Core** definuje `IEntity` (má `Guid Id`), `IEntityCreatable` (přidává `DateCreated`/`DateUpdated`/`DateDeleted` pro soft-delete) a generické `IRepository<T>`.
- **Domain** je organizovaný podle modulů (`Modules/Customers`, `Modules/General`, `Modules/Ordes` — pozor, překlep "Ordes" je záměrný/existující, zachovejte konzistenci se zbytkem kódu místo jeho izolované "opravy"). Každý modul má `Entities/`, `Repositories/` (pouze rozhraní) a někdy `Filters/` pro DTO filtrů dotazů (např. `OrderFilter`).
- **Infrastructure** implementuje repozitáře pomocí generických základních tříd `EFCrudRepository<TEntity, TContext>` / `EFCrudCreatableRepository<TEntity, TContext>`. Varianta `*Creatable` automaticky filtruje `GetAll()`/přetíženou `Get()` tak, aby vyloučila soft-deleted řádky (`DateDeleted == null`); mazání je implementováno jako nastavení `DateDeleted`, nikoli fyzické odstranění řádku — viz `OrdersController.Delete`. `Configurations/` obsahuje třídy `IEntityTypeConfiguration<T>` pro EF. `OptikSWDbContextFactory` podporuje design-time nástroje `dotnet ef`.
- Controllery ve **Web.API** jsou tenké: přímo si injektují rozhraní repozitářů (bez samostatné servisní vrstvy), mapují mezi entitami a DTO `*Model`/`*CreateModel`/`*UpdateModel` pomocí statických metod `CreateFrom(entity)` / instančních metod `ToEntity()` na modelech a vrací namapovaný model. CORS je zcela otevřené (`AllowAnyOrigin`) a statický build SPA je servírován přes `UseDefaultFiles`/`UseStaticFiles`/`MapFallbackToFile("/index.html")` — takže `OptikSW.Web.API` samotné může v produkci hostovat zbuildovanou React aplikaci.
- Repozitáře přidávají metody pro seznamy/dotazy nad rámec základního CRUD přímo na konkrétním repozitáři (např. `OrderRepository.GetAllForList(OrderFilter)`), pomocí pomocných rozšiřujících metod `IQueryable`/`IEnumerable` `WhereIfNotEmpty`/`WhereIfNotNull` (`OptikSW.Core/QueryableExtensions.cs`), které podmíněně aplikují filtr pouze pokud je zadaná hodnota filtru.

## Architektura frontendu

`optiksw.web.react/src` je organizovaný jako `pages/` (komponenty na úrovni routy, propojené v `App.tsx` přes `react-router-dom`), `components/<Domain>/<Feature>/` (feature komponenty, umístěné společně se svým `.css`), `interfaces/` (TypeScript rozhraní podle domény, např. `OrderInterfaces.tsx`), plus sdílené `FormComponents/` a `PageLayout/` (chrome SmartAdmin: sidebar, navigace, panely).

Načítání dat probíhá pomocí `useFetch(url)` z knihovny `react-fetch-hook` přímo v page komponentách (bez sdílené vrstvy API klienta/služby) proti `config.baseUrl + "<path>"`; komponenty renderují stavy `result.isLoading` / `result.data` / `result.error` inline. Tabulky jsou postavené na `react-data-table-component`.

Vizuální motiv je šablona třetí strany **SmartAdmin 4.5.1**, vendorovaná v `optiksw.web.react/vendor/smart-admin-4-5-1/` a odkazovaná pomocí absolutních cest jako `/vendor/smart-admin-4-5-1/img/logo.png`; považujte tento adresář za vendorovaný asset (vyhněte se ručním úpravám — změny raději přebírejte z šablony).

Texty v UI jsou v češtině (popisky, validační hlášky, navigace) — nové texty v UI udržujte jazykově konzistentní se stávajícími.