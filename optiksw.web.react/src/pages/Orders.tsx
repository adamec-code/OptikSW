import OrdersDataTable from "../components/Orders/OrdersDataTable/OrdersDataTable.tsx";
import config from "../config.ts";
import useFetch, { FetchResult } from "react-fetch-hook";
import { OrderData } from "../interfaces/OrderInterfaces.tsx";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import PageH1 from "../components/PageLayout/PageH1.tsx";
import PagePanel from "../components/PageLayout/PagePanel.tsx";
import FormTextBox from "../components/FormComponents/FormTextBox.tsx";
import PagePanelButtons from "../components/PageLayout/PagePanelButtons.tsx";

function addToQueryString(queryString: string, name: string, value: string): string {
    queryString += (value && (queryString && "&") + name + "=" + value);
    return queryString;
}

function Orders() {
    let [fulltext, setFulltext] = useState("");
    let [birthNumber, setBirthNumber] = useState("");

    let queryString = "";

    queryString = addToQueryString(queryString, "fulltext", fulltext);
    queryString = addToQueryString(queryString, "birthNumber", birthNumber);

    const ordersDataUrl = config.baseUrl + "/orders" + (queryString && "?" + queryString);
    //console.log(ordersDataUrl);
    const result = useFetch(ordersDataUrl) as FetchResult<OrderData[]>;

    function handleOnChange(event: FormEvent<HTMLFormElement>): void {
        const form = event.currentTarget;
        const fulltextInput = form.elements.namedItem("fulltext") as HTMLInputElement;
        setFulltext(fulltextInput.value);
        const birthNumberInput = form.elements.namedItem("birth-number") as HTMLInputElement;
        setBirthNumber(birthNumberInput.value);
    }

    return (
        <div id="order-list">
            <PageH1 title="Objednávky" description="Seznam objednávek" icon="briefcase" />

            <PagePanelButtons>
                <Link to="/orders/create" className="btn btn-primary">
                    <span className="fal fa-plus mr-2"></span>Nová objednávka
                </Link>
            </PagePanelButtons>

            <PagePanel title="Filtrování" collapsible={true}>                       
                <form onChange={handleOnChange}>
                    <div className="row">
                        <div className="col-2">
                            <FormTextBox id="fulltext" title="Fulltextové hledání" />
                        </div>
                        <div className="col-2">
                            <FormTextBox id="birth-number" title="Rodné číslo/datum narození" />
                        </div>
                    </div>
                </form>
            </PagePanel>
             
            <PagePanel title="Přehled objednávek" collapsible={true} fullwidthable={true}>
                    {result.isLoading && <div className="alert alert-info" role="alert">Nahrávám objednávky...</div>}
                    {result.data && <OrdersDataTable data={result.data} />}
                    {result.error && <div className="alert alert-danger" role="alert">Při načítání dat došlo k chybě: {result.error.message}</div>}
            </PagePanel>

        </div>
    );
}

export default Orders;