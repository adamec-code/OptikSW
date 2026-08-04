import "./OrderCardCreate.css";
import { CustomerData } from "../../../interfaces/CustomerInterfaces";
import config from "../../../config";
import { AddressData } from "../../../interfaces/GeneralInterfaces";

async function handleLoadCustomer(): Promise<void> {
  const input = document.getElementById(
    "customer-fulltext"
  ) as HTMLInputElement;
  const data = fetch(config.baseUrl + "/customers/?fulltext=" + input.value)
    .then((response) => response.json() as Promise<CustomerData[]>)
    .catch((reason) => console.error(reason.message));
  const results = (await data) as CustomerData[];
  if (results && results.length > 0) {
    const result = results[0] as CustomerData;

    (document.getElementById("customer-lastname") as HTMLInputElement).value =
      result.lastName;
    (document.getElementById("customer-firstname") as HTMLInputElement).value =
      result.firstName;
    (
      document.getElementById("customer-birthnumber") as HTMLInputElement
    ).value = result.birthNumber;
    (document.getElementById("customer-phone") as HTMLInputElement).value =
      result.phone;

    const addressResult = fetch(
      config.baseUrl + "/addresses/" + result.addressId
    )
      .then((response) => response.json() as Promise<AddressData>)
      .catch((reason) => console.error(reason.message));
    const addressData = (await addressResult) as AddressData;
    (
      document.getElementById("customer-addressline1") as HTMLInputElement
    ).value = addressData.addressLine1;
    (
      document.getElementById("customer-addressline2") as HTMLInputElement
    ).value = addressData.addressLine2;
    (document.getElementById("customer-city") as HTMLInputElement).value =
      addressData.city;
    (document.getElementById("customer-postcode") as HTMLInputElement).value =
      addressData.postCode;
  }
  disableControls(true);
}
function handleClearLoadCustomer(): void {
  const input = document.getElementById(
    "customer-fulltext"
  ) as HTMLInputElement;
  input.value = "";
  disableControls(false);
  clearControls();
}

function disableControls(disabled: boolean) {
  (document.getElementById("customer-lastname") as HTMLInputElement).disabled =
    disabled;
  (document.getElementById("customer-firstname") as HTMLInputElement).disabled =
    disabled;
  (
    document.getElementById("customer-birthnumber") as HTMLInputElement
  ).disabled = disabled;
  (
    document.getElementById("customer-addressline1") as HTMLInputElement
  ).disabled = disabled;
  (
    document.getElementById("customer-addressline2") as HTMLInputElement
  ).disabled = disabled;
  (document.getElementById("customer-city") as HTMLInputElement).disabled =
    disabled;
  (document.getElementById("customer-postcode") as HTMLInputElement).disabled =
    disabled;
  (document.getElementById("customer-phone") as HTMLInputElement).disabled =
    disabled;
}
function clearControls() {
  const value = "";
  (document.getElementById("customer-lastname") as HTMLInputElement).value =
    value;
  (document.getElementById("customer-firstname") as HTMLInputElement).value =
    value;
  (document.getElementById("customer-birthnumber") as HTMLInputElement).value =
    value;
  (document.getElementById("customer-addressline1") as HTMLInputElement).value =
    value;
  (document.getElementById("customer-addressline2") as HTMLInputElement).value =
    value;
  (document.getElementById("customer-city") as HTMLInputElement).value = value;
  (document.getElementById("customer-postcode") as HTMLInputElement).value =
    value;
  (document.getElementById("customer-phone") as HTMLInputElement).value = value;
}

function OrderCardCreate() {
  return (
    <div className="order-wrapper">
      <h3>Nová zakázka</h3>
      <table
        className="order-measurements distance"
        cellSpacing="0"
        cellPadding="0"
      >
        <tbody>
          <tr>
            <td colSpan={6}>
              <canvas
                id="canvas-left-eye"
                className="canvas-angle"
                width="175"
                height="75"
              ></canvas>
              <canvas
                id="canvas-right-eye"
                className="canvas-angle"
                width="175"
                height="75"
              ></canvas>
            </td>
            <td className="order-measurement-other-data">
              Čočky
              <br />
              (úprava)
            </td>
            <td className="order-measurement-other-data">
              Obroučky
              <br />
              (model)
            </td>
            <td className="order-measurement-other-data">Cena</td>
          </tr>
          <tr>
            <th rowSpan={2}>
              <h4>Dálka:</h4>
            </th>
            <td className="order-measurement-eye">Pravé oko:</td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="distance-right-eye-sphere"
                id="distance-right-eye-sphere"
                step="0.25"
                min="0.25"
                max="20"
                placeholder="Sféra"
                tabIndex={1}
              />
            </td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="distance-right-eye-cylinder"
                id="distance-right-eye-cylinder"
                step="0.25"
                min="0.25"
                max="20"
                placeholder="Cylindr"
                tabIndex={2}
              />
            </td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="distance-right-eye-angle"
                id="distance-right-eye-angle"
                step="1"
                min="0"
                max="180"
                placeholder="Osa"
                tabIndex={3}
              />
            </td>
            <td className="order-measurement-pupil-distance">
              <input
                type="text"
                name="distance-right-eye-pupil-distance"
                id="distance-right-eye-pupil-distance"
                placeholder="PD"
                tabIndex={4}
              />
            </td>
            <td rowSpan={2} className="order-measurement-layer-data">
              <input
                type="text"
                name="distance-layer"
                id="distance-layer"
                placeholder="Čočky (+ povrchová úprava)"
                tabIndex={10}
              />
              <input
                type="text"
                name="distance-layer-price"
                id="distance-layer-price"
                placeholder="Cena za čočky v Kč"
                tabIndex={11}
              />
            </td>
            <td rowSpan={2} className="order-measurement-other-data">
              <input
                type="text"
                name="distance-frames"
                id="distance-frames"
                placeholder="Obroučky (model)"
                tabIndex={12}
              />
              <input
                type="text"
                name="distance-frames-price"
                id="distance-frames-price"
                placeholder="Cena za obroučky v Kč"
                tabIndex={13}
              />
            </td>
            <td rowSpan={2} className="order-measurement-other-data">
              <input
                type="text"
                name="distance-price"
                id="distance-price"
                placeholder="Cena (obroučky + čočky) v Kč"
                tabIndex={14}
              />
            </td>
          </tr>
          <tr>
            <td className="order-measurement-eye">Levé oko:</td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="distance-left-eye-sphere"
                id="distance-left-eye-sphere"
                step="0.25"
                min="0.25"
                max="20"
                placeholder="Sféra"
                tabIndex={5}
              />
            </td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="distance-left-eye-cylinder"
                id="distance-left-eye-cylinder"
                step="0.25"
                min="0.25"
                max="20"
                placeholder="Cylindr"
                tabIndex={6}
              />
            </td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="distance-left-eye-angle"
                id="distance-left-eye-angle"
                step="1"
                min="0"
                max="180"
                placeholder="Osa"
                tabIndex={7}
              />
            </td>
            <td className="order-measurement-pupil-distance">
              <input
                type="text"
                name="distance-left-eye-pupil-distance"
                id="distance-left-eye-pupil-distance"
                placeholder="PD"
                tabIndex={8}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table
        className="order-measurements distance"
        cellSpacing="0"
        cellPadding="0"
      >
        <tbody>
          <tr>
            <th rowSpan={2}>
              <h4>Blízko:</h4>
            </th>
            <td className="order-measurement-eye">Pravé oko:</td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="nearby-right-eye-sphere"
                id="nearby-right-eye-sphere"
                step="0.25"
                min="0.25"
                max="20"
                placeholder="Sféra"
                tabIndex={15}
              />
            </td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="nearby-right-eye-cylinder"
                id="nearby-right-eye-cylinder"
                step="0.25"
                min="0.25"
                max="20"
                placeholder="Cylindr"
                tabIndex={16}
              />
            </td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="nearby-right-eye-angle"
                id="nearby-right-eye-angle"
                step="1"
                min="0"
                max="180"
                placeholder="Osa"
                tabIndex={17}
              />
            </td>
            <td className="order-measurement-pupil-distance">
              <input
                type="text"
                name="nearby-right-eye-pupil-distance"
                id="nearby-right-eye-pupil-distance"
                placeholder="PD"
                tabIndex={18}
              />
            </td>
            <td rowSpan={2} className="order-measurement-layer-data">
              <input
                type="text"
                name="nearby-layer"
                id="nearby-right-eye-layer"
                placeholder="Čočky (+ povrchová úprava)"
                tabIndex={23}
              />
              <input
                type="text"
                name="nearby-layer-price"
                id="nearby-layer-price"
                placeholder="Cena za čočky v Kč"
                tabIndex={24}
              />
            </td>
            <td rowSpan={2} className="order-measurement-other-data">
              <input
                type="text"
                name="nearby-frames"
                id="nearby-frames"
                placeholder="Obroučky (model)"
                tabIndex={25}
              />
              <input
                type="text"
                name="nearby-frames-price"
                id="nearby-frames-price"
                placeholder="Cena za obroučky v Kč"
                tabIndex={26}
              />
            </td>
            <td rowSpan={2} className="order-measurement-other-data">
              <input
                type="text"
                name="nearby-price"
                id="nearby-price"
                placeholder="Cena (obroučky + čočky) v Kč"
                tabIndex={27}
              />
            </td>
          </tr>
          <tr>
            <td className="order-measurement-eye">Levé oko:</td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="nearby-left-eye-sphere"
                id="nearby-left-eye-sphere"
                step="0.25"
                min="0.25"
                max="20"
                placeholder="Sféra"
                tabIndex={19}
              />
            </td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="nearby-left-eye-cylinder"
                id="nearby-left-eye-cylinder"
                step="0.25"
                min="0.25"
                max="20"
                placeholder="Cylindr"
                tabIndex={20}
              />
            </td>
            <td className="order-measurement-value">
              <input
                type="number"
                name="nearby-left-eye-angle"
                id="nearby-left-eye-angle"
                step="1"
                min="0"
                max="180"
                placeholder="Osa"
                tabIndex={21}
              />
            </td>
            <td className="order-measurement-pupil-distance">
              <input
                type="text"
                name="nearby-left-eye-pupil-distance"
                id="nearby-left-eye-pupil-distance"
                placeholder="PD"
                tabIndex={22}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <h3 className="order-price">
        Celková cena:{" "}
        <input type="text" name="price" id="price" tabIndex={28} /> Kč
      </h3>
      <div className="order-customer mb-2">
        <div className="filter-panel">
          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="customer-fulltext"
                  placeholder="Vyhledávání zákazníka"
                  tabIndex={29}
                />
              </div>
            </div>
            <div className="col-9 text-end">
              <div className="form-group">
                <button
                  className="btn btn-secondary"
                  tabIndex={30}
                  onClick={() => handleLoadCustomer()}
                >
                  Načíst
                </button>
                <button
                  className="btn btn-outline"
                  tabIndex={31}
                  onClick={() => handleClearLoadCustomer()}
                >
                  Zrušit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="order-customer-name">
          <span className="order-customer-label">Zákazník:</span>
          <div className="row order-customer-value">
            <div className="col-3">
              <input
                type="text"
                name="customer-lastname"
                id="customer-lastname"
                placeholder="Příjmení"
                tabIndex={32}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                name="customer-firstname"
                id="customer-firstname"
                placeholder="Jméno"
                tabIndex={33}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                name="customer-birthnumber"
                id="customer-birthnumber"
                placeholder="Datum narození/Rodné"
                tabIndex={34}
              />
            </div>
          </div>
        </div>
        <div className="order-customer-address">
          <span className="order-customer-label">Adresa:</span>
          <div className="row order-customer-value">
            <div className="col-3">
              <input
                type="text"
                name="customer-addressline1"
                id="customer-addressline1"
                placeholder="Uliče, č.p."
                tabIndex={35}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                name="customer-addressline2"
                id="customer-addressline2"
                placeholder="Doplňující údaje"
                tabIndex={36}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                name="customer-city"
                id="customer-city"
                placeholder="Město"
                tabIndex={37}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                name="customer-postcode"
                id="customer-postcode"
                placeholder="PSČ"
                tabIndex={38}
              />
            </div>
          </div>
        </div>
        <div className="order-customer-phone">
          <span className="order-customer-label">Telefon:</span>
          <div className="row order-customer-value">
            <div className="col-3">
              <input
                type="text"
                name="customer-phone"
                id="customer-phone"
                tabIndex={39}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-end">
          <button className="btn btn-primary" id="save" tabIndex={40}>
            Uložit
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderCardCreate;
