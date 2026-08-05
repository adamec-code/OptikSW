import { forwardRef, TextareaHTMLAttributes } from "react";

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    title?: string;
    error?: string;
    rows?: number;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
    ({ id, title, error, rows, name, ...props }, ref) => {
        return (
            <div className="form-group">
                {title && <label className="form-label" htmlFor={id}>{title}</label>}
                <textarea
                    className={`form-control${error ? " is-invalid" : ""}`}
                    id={id}
                    name={name ?? id}
                    rows={rows}
                    ref={ref}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...props}
                />
                {error && <div id={`${id}-error`} className="invalid-feedback d-block">{error}</div>}
            </div>
        );
    }
);
FormTextArea.displayName = "FormTextArea";

export default FormTextArea;