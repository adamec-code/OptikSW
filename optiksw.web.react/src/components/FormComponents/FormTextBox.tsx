import { forwardRef, InputHTMLAttributes } from "react";

interface FormTextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    title?: string;
    error?: string;
}

const FormTextBox = forwardRef<HTMLInputElement, FormTextBoxProps>(
    ({ id, title, error, disabled, name, ...props }, ref) => {
        return (
            <div className="form-group">
                {title && <label className="form-label" htmlFor={id}>{title}</label>}
                <div className="input-group bg-white shadow-inset-2">
                    <input
                        type="text"
                        className={`form-control${error ? " is-invalid" : ""}`}
                        id={id}
                        name={name ?? id}
                        disabled={disabled}
                        ref={ref}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? `${id}-error` : undefined}
                        {...props}
                    />
                </div>
                {error && <div id={`${id}-error`} className="invalid-feedback d-block">{error}</div>}
            </div>
        );
    }
);
FormTextBox.displayName = "FormTextBox";

export default FormTextBox;