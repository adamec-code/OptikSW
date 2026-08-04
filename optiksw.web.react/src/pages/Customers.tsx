import useFetch, { FetchResult } from "react-fetch-hook";
import { CustomerData } from "../interfaces/CustomerInterfaces";
import config from "../config";
import CustomersDataTable from "../components/Customers/CustomersDataTable/CustomersDataTable";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import PageH1 from "../components/PageLayout/PageH1";
import PagePanelButtons from "../components/PageLayout/PagePanelButtons";
import PagePanel from "../components/PageLayout/PagePanel";
import FormTextBox from "../components/FormComponents/FormTextBox";


function Customers() {
    let [fulltext, setFulltext] = useState("");
    
    const customersDataUrl = config.baseUrl + "/customers" + (fulltext && "?fulltext="+fulltext);
    //console.log(customersDataUrl);
    const result = useFetch(customersDataUrl) as FetchResult<CustomerData[]>;

    function handleOnChange(event: FormEvent<HTMLFormElement>): void {
        const form = event.currentTarget;
        const fulltextInput = form.elements.namedItem("fulltext") as HTMLInputElement;
        setFulltext(fulltextInput.value);
    }

    return (
        <div id="customer-list">
            <PageH1 title="Zákazníci" description="Seznam zákazníků" icon="user" />

            <PagePanelButtons>
                <Link to="/customers/create" className="btn btn-primary">
                    <span className="fal fa-plus mr-2"></span>Nový zákazník
                </Link>
            </PagePanelButtons>

            <PagePanel title="Filtrování" collapsible={true}>
                <form onChange={handleOnChange}>
                    <div className="row">
                        <div className="col-2">
                            <FormTextBox id="fulltext" title="Fulltextové hledání" />
                        </div>
                    </div>
                </form> 
            </PagePanel>

            <PagePanel title="Přehled zákazníků" collapsible={true} fullwidthable={true}>
                {result.isLoading && <div className="alert alert-info" role="alert">Nahrávám zákazníky...</div>}
                {result.data && <CustomersDataTable data={result.data} />}
                {result.error && <div className="alert alert-danger" role="alert">Při načítání dat došlo k chybě: {result.error.message}</div>}
            </PagePanel>
        </div>
    );
}

export default Customers;