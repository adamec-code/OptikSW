function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="page-wrapper">
            <div className="page-inner">
                {children}
            </div>
        </div>
    );
}

export default PageWrapper;