function FormTextArea({ id, rows, title }: { id: string, rows: number, title?: string }) {
    return (
        <div className="form-group">
            {title && <label className="form-label" htmlFor={id}>{title}</label>}
            <textarea className="form-control" id={id} rows={rows}></textarea>
        </div>
    );
}

export default FormTextArea;