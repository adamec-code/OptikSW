import { Link, useNavigate } from "react-router-dom";
import PageH1 from "../../PageLayout/PageH1";
import PagePanel, { PanelType } from "../../PageLayout/PagePanel";
import PagePanelButtons from "../../PageLayout/PagePanelButtons";
import FormTextBox from "../../FormComponents/FormTextBox";
import FormTextArea from "../../FormComponents/FormTextArea";
import { ActionMeta, SingleValue } from "react-select";
import AsyncSelect from 'react-select/async';
import config from "../../../config";
import { CustomerData } from "../../../interfaces/CustomerInterfaces";
import { AddressData } from "../../../interfaces/GeneralInterfaces";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderCreateFormSchema, OrderCreateFormValues, OrderCreateFormInput } from "../../../schemas/orderSchema";
import { apiPost } from "../../../lib/apiFetch";


function loadOptions(inputValue: string) {
    return new Promise<{ value: string, label: string }[]>(async (resolve) => {
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

const emptyEyeMeasurement = { pupilDistance: "", sphere: "", cylinder: "", angle: "", prisma: "", basis: "" };

const defaultValues: OrderCreateFormInput = {
    customerMode: "new",
    existingCustomerId: undefined,
    existingAddressId: undefined,
    newCustomer: { beforeName: "", firstName: "", lastName: "", afterName: "", birthNumber: "", phone: "" },
    newAddress: { addressLine1: "", addressLine2: "", city: "", postCode: "" },
    note: "",
    distance: { rightEye: { ...emptyEyeMeasurement }, leftEye: { ...emptyEyeMeasurement } },
    nearby: { rightEye: { ...emptyEyeMeasurement }, leftEye: { ...emptyEyeMeasurement } },
};

function OrderCreate() {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<OrderCreateFormInput, unknown, OrderCreateFormValues>({
        resolver: zodResolver(orderCreateFormSchema),
        defaultValues,
    });

    const customerMode = watch("customerMode");

    async function fillExistingCustomer(newValue: SingleValue<{ value: string; label: string; }>, actionMeta: ActionMeta<{ value: string; label: string; }>): Promise<void> {
        if (actionMeta.action !== "select-option" || !newValue) {
            setValue("existingCustomerId", undefined);
            setValue("existingAddressId", undefined);
            setExistingCustomerDisplay(undefined, undefined);
            return;
        }

        const data = await (fetch(config.baseUrl + "/customers/" + newValue.value).then((response) => response.json()) as Promise<CustomerData>);
        const dataAddress = await (fetch(config.baseUrl + "/addresses/" + data.addressId).then((response) => response.json()) as Promise<AddressData>);

        setValue("existingCustomerId", data.id);
        setValue("existingAddressId", dataAddress.id);
        setExistingCustomerDisplay(data, dataAddress);
    }

    const [existingCustomerDisplay, setExistingCustomerDisplayState] = useState<{ data?: CustomerData; address?: AddressData }>({});
    function setExistingCustomerDisplay(data: CustomerData | undefined, address: AddressData | undefined) {
        setExistingCustomerDisplayState({ data, address });
    }

    const onSubmit: SubmitHandler<OrderCreateFormValues> = async (values) => {
        setSubmitError(null);

        let customerId: string;
        let addressId: string;

        if (values.customerMode === "existing") {
            customerId = values.existingCustomerId as string;
            addressId = values.existingAddressId as string;
        } else {
            const addressResult = await apiPost<AddressData>("/addresses", values.newAddress);
            if (!addressResult.ok) {
                setSubmitError(addressResult.message);
                return;
            }
            addressId = addressResult.data.id;

            const customerResult = await apiPost<CustomerData>("/customers", {
                ...values.newCustomer,
                addressId,
            });
            if (!customerResult.ok) {
                setSubmitError(customerResult.message);
                return;
            }
            customerId = customerResult.data.id;
        }

        const newOrder = {
            prefix: 1,
            number: 1,
            customerId,
            orderAddressId: addressId,
            distance: {
                rightEye: values.distance.rightEye,
                leftEye: values.distance.leftEye,
                type: 1,
                layer: "",
                layerPrice: 0.0,
                frames: "",
                framesPrice: 0.0,
                price: 0.0,
            },
            nearby: {
                rightEye: values.nearby.rightEye,
                leftEye: values.nearby.leftEye,
                type: 2,
                layer: "",
                layerPrice: 0.0,
                frames: "",
                framesPrice: 0.0,
                price: 0.0,
            },
        };

        const orderResult = await apiPost<{ id: string }>("/orders", newOrder);
        if (!orderResult.ok) {
            setSubmitError(orderResult.message);
            return;
        }

        navigate("/orders");
    };

    return (
        <div id="order-wrapper">
            <PageH1 title="Nová objednávka" subTitle="Zhotovení brýlí" description="Založte objednávku na zhotovení brýlí" icon="briefcase" />

            <form id="order-create" onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                <PagePanelButtons>
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                        <span className="fal fa-save mr-2"></span>Uložit
                    </button>
                    <Link to="/orders" className="btn btn-outline">
                        Zpět
                    </Link>
                </PagePanelButtons>

                {submitError && (
                    <div className="alert alert-danger" role="alert">{submitError}</div>
                )}

                <div className="row">
                    <PagePanel title="Zákazník" panelType={PanelType.Halfwidth} collapsible={true} fullwidthable={true}>
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className={`nav-link${customerMode === "new" ? " active" : ""}`} data-toggle="tab" href="#tab_borders_icons-1" role="tab" aria-selected={customerMode === "new"} onClick={() => setValue("customerMode", "new")}>
                                    <i className="fal fa-plus mr-1"></i> Nový
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link${customerMode === "existing" ? " active" : ""}`} data-toggle="tab" href="#tab_borders_icons-2" role="tab" aria-selected={customerMode === "existing"} onClick={() => setValue("customerMode", "existing")}>
                                    <i className="fal fa-search mr-1"></i> Stávající</a>
                            </li>
                        </ul>
                        <div className="tab-content border border-top-0 p-3">
                            <div className={`tab-pane fade${customerMode === "new" ? " active show" : ""}`} id="tab_borders_icons-1" role="tabpanel">
                                <div className="form-row">
                                    <div className="col-2"><FormTextBox id="newCustomer.beforeName" title="Titul před" error={errors.newCustomer?.beforeName?.message} {...register("newCustomer.beforeName")} /> </div>
                                    <div className="col-4"><FormTextBox id="newCustomer.firstName" title="Jméno" error={errors.newCustomer?.firstName?.message} {...register("newCustomer.firstName")} /> </div>
                                    <div className="col-4"><FormTextBox id="newCustomer.lastName" title="Příjmení" error={errors.newCustomer?.lastName?.message} {...register("newCustomer.lastName")} /></div>
                                    <div className="col-2"><FormTextBox id="newCustomer.afterName" title="Titul za" error={errors.newCustomer?.afterName?.message} {...register("newCustomer.afterName")} /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6"><FormTextBox id="newCustomer.birthNumber" title="Rodné číslo/datum narození" error={errors.newCustomer?.birthNumber?.message} {...register("newCustomer.birthNumber")} /> </div>
                                    <div className="col-6"><FormTextBox id="newCustomer.phone" title="Telefon" error={errors.newCustomer?.phone?.message} {...register("newCustomer.phone")} /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12"><FormTextBox id="newAddress.addressLine1" title="Adresa (ulice, č.p.)" error={errors.newAddress?.addressLine1?.message} {...register("newAddress.addressLine1")} /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12"><FormTextBox id="newAddress.addressLine2" title="Doplňující údaje" error={errors.newAddress?.addressLine2?.message} {...register("newAddress.addressLine2")} /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-3"><FormTextBox id="newAddress.postCode" title="PSČ" error={errors.newAddress?.postCode?.message} {...register("newAddress.postCode")} /> </div>
                                    <div className="col-9"><FormTextBox id="newAddress.city" title="Město" error={errors.newAddress?.city?.message} {...register("newAddress.city")} /> </div>
                                </div>
                            </div>
                            <div className={`tab-pane fade${customerMode === "existing" ? " active show" : ""}`} id="tab_borders_icons-2" role="tabpanel">
                                <div className="form-row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <AsyncSelect
                                                id="existing-customer"
                                                className={`form-control p-0${errors.existingCustomerId ? " is-invalid" : ""}`}
                                                isClearable={true}
                                                defaultOptions
                                                cacheOptions
                                                loadOptions={loadOptions}
                                                onChange={fillExistingCustomer}
                                            ></AsyncSelect>
                                            {errors.existingCustomerId && <div className="invalid-feedback d-block">{errors.existingCustomerId.message}</div>}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-row">
                                    <div className="col-2"><FormTextBox id="existing-title-before" title="Titul před" value={existingCustomerDisplay.data?.titleBefore ?? ""} disabled={true} readOnly /> </div>
                                    <div className="col-4"><FormTextBox id="existing-first-name" title="Jméno" value={existingCustomerDisplay.data?.firstName ?? ""} disabled={true} readOnly /> </div>
                                    <div className="col-4"><FormTextBox id="existing-last-name" title="Příjmení" value={existingCustomerDisplay.data?.lastName ?? ""} disabled={true} readOnly /></div>
                                    <div className="col-2"><FormTextBox id="existing-title-after" title="Titul za" value={existingCustomerDisplay.data?.titleAfter ?? ""} disabled={true} readOnly /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-6"><FormTextBox id="existing-birth-number" title="Rodné číslo/datum narození" value={existingCustomerDisplay.data?.birthNumber ?? ""} disabled={true} readOnly /> </div>
                                    <div className="col-6"><FormTextBox id="existing-phone" title="Telefon" value={existingCustomerDisplay.data?.phone ?? ""} disabled={true} readOnly /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12"><FormTextBox id="existing-address-line1" title="Adresa (ulice, č.p.)" value={existingCustomerDisplay.address?.addressLine1 ?? ""} disabled={true} readOnly /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12"><FormTextBox id="existing-address-line2" title="Doplňující údaje" value={existingCustomerDisplay.address?.addressLine2 ?? ""} disabled={true} readOnly /> </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-3"><FormTextBox id="existing-post-code" title="PSČ" value={existingCustomerDisplay.address?.postCode ?? ""} disabled={true} readOnly /> </div>
                                    <div className="col-9"><FormTextBox id="existing-city" title="Město" value={existingCustomerDisplay.address?.city ?? ""} disabled={true} readOnly /> </div>
                                </div>
                            </div>

                        </div>
                    </PagePanel>
                    <PagePanel title="Poznámka" panelType={PanelType.Halfwidth} collapsible={true} fullwidthable={true}>
                        <FormTextArea id="note" title="Poznámka" rows={6} error={errors.note?.message} {...register("note")} />
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
                                    <td><FormTextBox id="distance.rightEye.pupilDistance" error={errors.distance?.rightEye?.pupilDistance?.message} {...register("distance.rightEye.pupilDistance")} /></td>
                                    <td><FormTextBox id="distance.rightEye.sphere" error={errors.distance?.rightEye?.sphere?.message} {...register("distance.rightEye.sphere")} /></td>
                                    <td><FormTextBox id="distance.rightEye.cylinder" error={errors.distance?.rightEye?.cylinder?.message} {...register("distance.rightEye.cylinder")} /></td>
                                    <td><FormTextBox id="distance.rightEye.angle" error={errors.distance?.rightEye?.angle?.message} {...register("distance.rightEye.angle")} /></td>
                                    <td><FormTextBox id="distance.rightEye.prisma" error={errors.distance?.rightEye?.prisma?.message} {...register("distance.rightEye.prisma")} /></td>
                                    <td><FormTextBox id="distance.rightEye.basis" error={errors.distance?.rightEye?.basis?.message} {...register("distance.rightEye.basis")} /></td>
                                </tr>
                                <tr>
                                    <th>Levé&nbsp;oko</th>
                                    <td><FormTextBox id="distance.leftEye.pupilDistance" error={errors.distance?.leftEye?.pupilDistance?.message} {...register("distance.leftEye.pupilDistance")} /></td>
                                    <td><FormTextBox id="distance.leftEye.sphere" error={errors.distance?.leftEye?.sphere?.message} {...register("distance.leftEye.sphere")} /></td>
                                    <td><FormTextBox id="distance.leftEye.cylinder" error={errors.distance?.leftEye?.cylinder?.message} {...register("distance.leftEye.cylinder")} /></td>
                                    <td><FormTextBox id="distance.leftEye.angle" error={errors.distance?.leftEye?.angle?.message} {...register("distance.leftEye.angle")} /></td>
                                    <td><FormTextBox id="distance.leftEye.prisma" error={errors.distance?.leftEye?.prisma?.message} {...register("distance.leftEye.prisma")} /></td>
                                    <td><FormTextBox id="distance.leftEye.basis" error={errors.distance?.leftEye?.basis?.message} {...register("distance.leftEye.basis")} /></td>
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
                                    <td><FormTextBox id="nearby.rightEye.pupilDistance" error={errors.nearby?.rightEye?.pupilDistance?.message} {...register("nearby.rightEye.pupilDistance")} /></td>
                                    <td><FormTextBox id="nearby.rightEye.sphere" error={errors.nearby?.rightEye?.sphere?.message} {...register("nearby.rightEye.sphere")} /></td>
                                    <td><FormTextBox id="nearby.rightEye.cylinder" error={errors.nearby?.rightEye?.cylinder?.message} {...register("nearby.rightEye.cylinder")} /></td>
                                    <td><FormTextBox id="nearby.rightEye.angle" error={errors.nearby?.rightEye?.angle?.message} {...register("nearby.rightEye.angle")} /></td>
                                    <td><FormTextBox id="nearby.rightEye.prisma" error={errors.nearby?.rightEye?.prisma?.message} {...register("nearby.rightEye.prisma")} /></td>
                                    <td><FormTextBox id="nearby.rightEye.basis" error={errors.nearby?.rightEye?.basis?.message} {...register("nearby.rightEye.basis")} /></td>
                                </tr>
                                <tr>
                                    <th>Levé&nbsp;oko</th>
                                    <td><FormTextBox id="nearby.leftEye.pupilDistance" error={errors.nearby?.leftEye?.pupilDistance?.message} {...register("nearby.leftEye.pupilDistance")} /></td>
                                    <td><FormTextBox id="nearby.leftEye.sphere" error={errors.nearby?.leftEye?.sphere?.message} {...register("nearby.leftEye.sphere")} /></td>
                                    <td><FormTextBox id="nearby.leftEye.cylinder" error={errors.nearby?.leftEye?.cylinder?.message} {...register("nearby.leftEye.cylinder")} /></td>
                                    <td><FormTextBox id="nearby.leftEye.angle" error={errors.nearby?.leftEye?.angle?.message} {...register("nearby.leftEye.angle")} /></td>
                                    <td><FormTextBox id="nearby.leftEye.prisma" error={errors.nearby?.leftEye?.prisma?.message} {...register("nearby.leftEye.prisma")} /></td>
                                    <td><FormTextBox id="nearby.leftEye.basis" error={errors.nearby?.leftEye?.basis?.message} {...register("nearby.leftEye.basis")} /></td>
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