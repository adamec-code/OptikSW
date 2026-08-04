function PageH1({ title, subTitle, sticker, description, icon }: { title: string, subTitle?: string, sticker?: string, description?: string, icon?: string }) {
    return (
        <div className="subheader mb-0 pb-0">
            <h1 className="subheader-title">
                {icon && <span><i className={`subheader-icon fal fa-${icon}`}></i>&nbsp;</span>}
                {title}&nbsp;
                {subTitle && <span className="fw-300">{subTitle}&nbsp;</span>}
                {sticker && <sup className="badge badge-primary fw-500">{sticker}</sup>}
                {description && <small>{description}</small>}
            </h1>
        </div>
    );
}

export default PageH1;