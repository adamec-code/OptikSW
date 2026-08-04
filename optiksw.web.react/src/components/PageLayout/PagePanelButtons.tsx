function PagePanelButtons({ children }: { children: React.ReactNode }) {
    return (
        <div className="row pb-3">
            <div className="col-12 text-right">
                {children}
            </div>
        </div>
    );
}

export default PagePanelButtons;