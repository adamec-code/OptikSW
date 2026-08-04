using Microsoft.EntityFrameworkCore;
using OptikSW.Infrastructure.DataAccess;
using OptikSW.Web.API;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddRouting(config => config.LowercaseUrls = true);
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<OptikSWDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("connection")));

builder.Services.AddRepositories();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
