function FormTextBox({ id, title, disabled, ...props }: { id: string, title?: string, disabled?: boolean }) {
    return (
        <div className="form-group">
            {title && <label className="form-label" htmlFor={id}>{title}</label>}
            <div className="input-group bg-white shadow-inset-2">
                <input type="text" className="form-control" id={id} name={id} disabled={disabled} {...props} />
            </div>
        </div>
    );
}

export default FormTextBox;