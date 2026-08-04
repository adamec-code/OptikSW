function CustomersCreate() {
    return (
        <div className="customer-wrapper">
            <h3>Nový zákazník</h3>
            <div className="row">
                <div className="col-2">
                    <label htmlFor="birth-number">Rodné číslo / datum narození</label>
                    <input className="form-control" name="birth-number" type="text" placeholder="Rodné číslo / datum narození" aria-label="birthNumber" />
                </div>
                <div className="col-2">
                    <input className="form-control" type="text" placeholder="Adresa" aria-label="addressLine1" />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <input className="form-control" type="text" placeholder="Doplňující informace" aria-label="addressLine2" />
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <input className="form-control" type="text" placeholder="PSČ" aria-label="postCode" />
                </div>
                <div className="col-3">
                    <input className="form-control" type="text" placeholder="Město" aria-label="city" />
                </div>
            </div>
        </div>
    );
}

export default CustomersCreate;