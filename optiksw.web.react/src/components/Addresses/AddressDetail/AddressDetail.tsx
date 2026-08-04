import { AddressData } from "../../../interfaces/GeneralInterfaces";

function AddressDetail({ address }: { address: AddressData }) {
    return (
        <div className="address-detail-wrapper">
            {address.addressLine1}<br />
            {address.addressLine2 && (address.addressLine2 && <br />)}
            {address.postCode} {address.city}
        </div>
    );
}

export default AddressDetail;