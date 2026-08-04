import { Link } from "react-router-dom";
import PageH1 from "../../PageLayout/PageH1";
import PagePanel, { PanelType } from "../../PageLayout/PagePanel";
import PagePanelButtons from "../../PageLayout/PagePanelButtons";
import FormTextBox from "../../FormComponents/FormTextBox";
import FormTextArea from "../../FormComponents/FormTextArea";
import { ActionMeta, SelectInstance, SingleValue } from "react-select";
import AsyncSelect from 'react-select/async';
import config from "../../../config";
import { CustomerData } from "../../../interfaces/CustomerInterfaces";
import { AddressData } from "../../../interfaces/GeneralInterfaces";
import { FormEvent, useRef } from "react";
import { parseDecimal, parseInteger } from "../../../helpers";


function loadOptions(inputValue: string) {
    return new Promise<{value: string, label: string}[]>(async (resolve) => {
        const response = fetch(config.baseUrl + "/customers").then((response) => response.json()) as Promise<CustomerData[]>;
        const data = await response;
        resolve(data.map((x) => (
            {
                value: x.id,
                label: x.fullName + ", " + x.fullAddress
            })
        ).filter(x => x.label.toLowerCase().includes(inputValue.toLowerCase())));
    });
}


function OrderCreate() {

    const asyncRef = useRef<SelectInstance<{ value: string; label: string; }> | null>(null);

    async function fillExistingCustomer(newValue: SingleValue<{ value: string; label: string; }>, actionMeta: ActionMeta<{ value: string; label: string; }>): Promise<void> {
        let data: (CustomerData | undefined) = undefined;
        let dataAddress: (AddressData | undefined) = undefined;

        if (actionMeta.action == "select-option") {
            const response = fetch(config.baseUrl + "/customers/" + newValue?.value).then((response) => response.json()) as Promise<CustomerData>;
            data = await response;
            const responseAdddress = fetch(config.baseUrl + "/addresses/" + data?.addressId).then((response) => response.json()) as Promise<AddressData>;
            dataAddress = await responseAdddress;
        }
        setExistingCustomerValues(data, dataAddress);
    }

    function clearExistingCustomer() {
        asyncRef.current?.clearValue();
        setExistingCustomerValues(undefined, undefined);
    }

    function setExistingCustomerValues(data: CustomerData | undefined, dataAddress: AddressData | undefined) {
        
        (document.getElementById("existing-title-before") as HTMLInputElement).value = (data && data.titleBefore) ?? "";
        (document.getElementById("existing-first-name") as HTMLInputElement).value = (data && data.firstName) ?? "";
        (document.getElementById("existing-last-name") as HTMLInputElement).value = (data && data.lastName) ?? "";
        (document.getElementById("existing-title-after") as HTMLInputElement).value = (data && data.titleAfter) ?? "";
        (document.getElementById("existing-birth-number") as HTMLInputElement).value = (data && data.birthNumber) ?? "";
        (document.getElementById("existing-phone") as HTMLInputElement).value = (data && data.phone) ?? "";
        (document.getElementById("existing-address-id") as HTMLInputElement).value = (dataAddress && dataAddress.id) ?? "";
        (document.getElementById("existing-address-line1") as HTMLInputElement).value = (dataAddress && dataAddress.addressLine1) ?? "";
        (document.getElementById("existing-address-line2") as HTMLInputElement).value = (dataAddress && dataAddress.addressLine2) ?? "";
        (document.getElementById("existing-city") as HTMLInputElement).value = (dataAddress && dataAddress.city) ?? "";
        (document.getElementById("existing-post-code") as HTMLInputElement).value = (dataAddress && dataAddress.postCode) ?? "";
    }
    

    async function handleonSubmit(event: FormEvent<HTMLFormElement>): Promise<any> {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);

        let customerId: string;
        let addressId: string;

        const existingCustomerId = asyncRef.current?.getValue()[0]?.value;
        if (existingCustomerId) {
            customerId = existingCustomerId;
            addressId = data.get("existing-address-id")?.valueOf() as string;
        }
        else {

            const newAddress = {
                addressLine1: data.get("address-line1")?.valueOf() as string,
                addressLine2: data.get("address-line2")?.valueOf() as string,
                city: data.get("city")?.valueOf() as string,
                postCode: parseInteger(data.get("post-code")?.valueOf().toString())
            };

            const newAddressResponse = await fetch(config.baseUrl + "/addresses", {
                method: "POST",
                body: JSON.stringify(newAddress),
                headers: { 'Content-type': 'application/json' }
            }).then(response => response.json())

            console.log(newAddressResponse);

            addressId = newAddressResponse.id;

            const newCustomer = {
                beforeName: data.get("title-before")?.valueOf() as string,
                firstName: data.get("first-name")?.valueOf() as string,
                lastName: data.get("last-name")?.valueOf() as string,
                afterName: data.get("title-after")?.valueOf() as string,
                birthNumber: data.get("birth-number")?.valueOf() as string,
                phone: data.get("phone")?.valueOf() as string,
                addressId: addressId,
            };

            const newCustomerResponse = await fetch(config.baseUrl + "/customers", {
                method: "POST",
                body: JSON.stringify(newCustomer),
                headers: { 'Content-type': 'application/json' }
            }).then(response => response.json());

            customerId = newCustomerResponse.id;
        }

        const newOrder = {
            "prefix": 1,
            "number": 1,
            customerId: customerId,
            orderAddressId: addressId,
            "distance": {
                "rightEye": {
                    "sphere": parseDecimal(data.get("distance-righteye-sphere")?.valueOf().toString()) ?? 0,
                    "cylinder": parseDecimal(data.get("distance-righteye-cylinder")?.valueOf().toString()),
                    "angle": parseInteger(data.get("distance-righteye-angle")?.valueOf().toString()),
                    "prisma": null,
                    "basis": null,
                    "pupilDistance": parseInteger(data.get("distance-righteye-pd")?.valueOf().toString()),
                },
                "leftEye": {
                    "sphere": parseDecimal(data.get("distance-lefteye-sphere")?.valueOf().toString()) ?? 0,
                    "cylinder": parseDecimal(data.get("distance-lefteye-cylinder")?.valueOf().toString()),
                    "angle": parseInteger(data.get("distance-lefteye-angle")?.valueOf().toString()),
                    "prisma": null,
                    "basis": null,
                    "pupilDistance": parseInteger(data.get("distance-lefteye-pd")?.valueOf().toString()),
                },
                "type": 1,
                "layer": "",
                "layerPrice": 0.0,
                "frames": "",
                "framesPrice": 0.0,
                "price": 0.0,
            },
            "nearby": {
                "rightEye": {
                    "sphere": parseDecimal(data.get("nearby-righteye-sphere")?.valueOf().toString()) ?? 0,
                    "cylinder": parseDecimal(data.get("nearby-righteye-cylinder")?.valueOf().toString()),
                    "angle": parseInteger(data.get("nearby-righteye-angle")?.valueOf().toString()),
                    "prisma": 0,
                    "basis": "",
                    "pupilDistance": parseInteger(data.get("nearby-righteye-pd")?.valueOf().toString()),
                },
                "leftEye": {
                    "sphere": parseDecimal(data.get("nearby-lefteye-sphere")?.valueOf().toString()) ?? 0,
                    "cylinder": parseDecimal(data.get("nearby-lefteye-cylinder")?.valueOf().toString()),
                    "angle": parseInteger(data.get("nearby-lefteye-angle")?.valueOf().toString()),
                    "prisma": 0,
                    "basis": "",
                    "pupilDistance": parseInteger(data.get("nearby-lefteye-pd")?.valueOf().toString()),
                },
                "type": 2,
                "layer": "",
                "layerPrice": 0.0,
                "frames": "",
                "framesPrice": 0.0,
                "price": 0.0,
            },
        };

        const newOrderResponse = await fetch(config.baseUrl + "/orders", {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: { 'Content-type': 'application/json' }
        }).then(response => response.json());

        console.log(newOrderResponse);
    

        //fetch('/api/form-submit-url', {
        //    method: 'POST',
        //    body: data,
        //});
    }

    return (
        <div id="order-wrapper">
            <PageH1 title="Nová objednávka" subTitle="Zhotovení brýlí" description="Založte objednávku na zhotovení brýlí" icon="briefcase" />

            <form id="order-create" onSubmit={handleonSubmit} className="needs-validation" noValidate={true}>
                <PagePanelButtons>
                    <button className="btn btn-primary" type="submit">
                        <span className="fal fa-save mr-2"></span>Uložit
                    </button>
                    <Link to="/orders" className="btn btn-outline">
                        Zpět
                    </Link>
                </PagePanelButtons>

                <div className="row">
                    <PagePanel title="Zákazník" panelType={PanelType.Halfwidth} collapsible={true} fullwidthable={true}>
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#tab_borders_icons-1" role="tab" aria-selected="true" onClick={() => clearExistingCustomer()}>
                                    <i className="fal fa-plus mr-1"></i> Nový
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tab_borders_icons-2" role="tab" aria-selected="false">
                                    <i className="fal fa-search mr-1"></i> Stávající</a>
                            </li>
                        </ul>
                        <div className="tab-content border border-top-0 p-3">
                            <div className="tab-pane fade active show" id="tab_borders_icons-1" role="tabpanel">
                                <div className="form-row">
                                    <div className="col-2"><FormTextBox id="title-before" title="Titul před" /> </div>
                                    <div className="col-4"><FormTextBox id="first-name" title="Jméno" /> </div>
                                    <div className="col-4"><FormTextBox id="last-name" title="Příjmení" /></div>
                                    <div className="col-2"><FormTextBox id="title-after" title="Titul za" /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6"><FormTextBox id="birth-number" title="Rodné číslo/datum narození" /> </div>
                                    <div className="col-6"><FormTextBox id="phone" title="Telefon" /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12"><FormTextBox id="address-line1" title="Adresa (ulice, č.p.)" /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12"><FormTextBox id="address-line2" title="Doplňující údaje" /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-3"><FormTextBox id="post-code" title="PSČ" /> </div>
                                    <div className="col-9"><FormTextBox id="city" title="Město" /> </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab_borders_icons-2" role="tabpanel">
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <AsyncSelect
                                                id="existing-customer"
                                                className="form-control p-0"
                                                isClearable={true}
                                                defaultOptions
                                                cacheOptions
                                                loadOptions={loadOptions}
                                                onChange={fillExistingCustomer}
                                                ref={asyncRef}
                                            ></AsyncSelect>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-row">
                                    <div className="col-2"><FormTextBox id="existing-title-before" title="Titul před" disabled={true} /> </div>
                                    <div className="col-4"><FormTextBox id="existing-first-name" title="Jméno" disabled={true} /> </div>
                                    <div className="col-4"><FormTextBox id="existing-last-name" title="Příjmení" disabled={true} /></div>
                                    <div className="col-2"><FormTextBox id="existing-title-after" title="Titul za" disabled={true} /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6"><FormTextBox id="existing-birth-number" title="Rodné číslo/datum narození" disabled={true} /> </div>
                                    <div className="col-6"><FormTextBox id="existing-phone" title="Telefon"  /> </div>
                                </div>
                                <div className="form-row">
                                    <input type="hidden" name="existing-address-id" id="existing-address-id" />
                                    <div className="col-12"><FormTextBox id="existing-address-line1" title="Adresa (ulice, č.p.)" disabled={true} /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12"><FormTextBox id="existing-address-line2" title="Doplňující údaje" disabled={true} /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-3"><FormTextBox id="existing-post-code" title="PSČ" disabled={true} /> </div>
                                    <div className="col-9"><FormTextBox id="existing-city" title="Město" disabled={true} /> </div>
                                </div>
                            </div>

                        </div>
                    </PagePanel>
                    <PagePanel title="Poznámka" panelType={PanelType.Halfwidth} collapsible={true} fullwidthable={true}>
                        <FormTextArea id="note" title="Poznámka" rows={6} /> 
                    </PagePanel>
                    <PagePanel title="Korekce dálka" panelType={PanelType.Fullwidth} collapsible={true} fullwidthable={true}>
                        <table className="table m-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>PD</th>
                                    <th>Sféra</th>
                                    <th>Cylindr</th>
                                    <th>Osa</th>
                                    <th>Prisma</th>
                                    <th>Basis</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Pravé&nbsp;oko</th>
                                    <td><FormTextBox id="distance-righteye-pd" /></td>
                                    <td><FormTextBox id="distance-righteye-sphere" /></td>
                                    <td><FormTextBox id="distance-righteye-cylinder" /></td>
                                    <td><FormTextBox id="distance-righteye-angle" /></td>
                                    <td><FormTextBox id="distance-righteye-prisma" /></td>
                                    <td><FormTextBox id="distance-righteye-basis" /></td>
                                </tr>
                                <tr>
                                    <th>Levé&nbsp;oko</th>
                                    <td><FormTextBox id="distance-lefteye-pd" /></td>
                                    <td><FormTextBox id="distance-lefteye-sphere" /></td>
                                    <td><FormTextBox id="distance-lefteye-cylinder" /></td>
                                    <td><FormTextBox id="distance-lefteye-angle" /></td>
                                    <td><FormTextBox id="distance-lefteye-prisma" /></td>
                                    <td><FormTextBox id="distance-lefteye-basis" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </PagePanel>
                    <PagePanel title="Korekce blízko" panelType={PanelType.Fullwidth} collapsible={true} fullwidthable={true}>
                        <table className="table m-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>PD</th>
                                    <th>Sféra</th>
                                    <th>Cylindr</th>
                                    <th>Osa</th>
                                    <th>Prisma</th>
                                    <th>Basis</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Pravé&nbsp;oko</th>
                                    <td><FormTextBox id="nearby-righteye-pd" /></td>
                                    <td><FormTextBox id="nearby-righteye-sphere" /></td>
                                    <td><FormTextBox id="nearby-righteye-cylinder" /></td>
                                    <td><FormTextBox id="nearby-righteye-angle" /></td>
                                    <td><FormTextBox id="nearby-righteye-prisma" /></td>
                                    <td><FormTextBox id="nearby-righteye-basis" /></td>
                                </tr>
                                <tr>
                                    <th>Levé&nbsp;oko</th>
                                    <td><FormTextBox id="nearby-lefteye-pd" /></td>
                                    <td><FormTextBox id="nearby-lefteye-sphere" /></td>
                                    <td><FormTextBox id="nearby-lefteye-cylinder" /></td>
                                    <td><FormTextBox id="nearby-lefteye-angle" /></td>
                                    <td><FormTextBox id="nearby-lefteye-prisma" /></td>
                                    <td><FormTextBox id="nearby-lefteye-basis" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </PagePanel>
                </div>
            </form>
        </div>
    );
}

export default OrderCreate;