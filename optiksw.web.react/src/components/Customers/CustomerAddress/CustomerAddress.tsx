import useFetch, { FetchResult } from "react-fetch-hook";
import config from "../../../config";
import { CustomerData } from "../../../interfaces/CustomerInterfaces";
import { AddressData } from "../../../interfaces/GeneralInterfaces";
import AddressDetail from "../../Addresses/AddressDetail/AddressDetail";

function CustomerAddress({ data }: { data: CustomerData }) {

    const addressDetailDataUrl = config.baseUrl + "/addresses/" + data.addressId;
    const result = useFetch(addressDetailDataUrl) as FetchResult<AddressData>;

    const addressDetail = result.data
        ? <AddressDetail address={result.data} />
        : <div className="alert alert-danger" role="alert">Neexistující adresa! {addressDetailDataUrl}</div>;

    return (
        <div className="col-12 px-2 py-2">
            {addressDetail}
        </div>
    );
}

export default CustomerAddress;