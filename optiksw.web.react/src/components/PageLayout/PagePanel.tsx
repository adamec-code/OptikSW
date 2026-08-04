export enum PanelType {
    Fullwidth,
    Halfwidth
}

function PagePanel({ children, title, panelType, collapsible, fullwidthable }: { children: React.ReactNode, title: string, panelType?: PanelType, collapsible?: boolean, fullwidthable?: boolean }) {
    if (!panelType) {
        panelType = PanelType.Fullwidth;
    }

    const col = panelType === PanelType.Fullwidth
        ? "col-xl-12"
        : "col-xl-6";

    return (
        <div className={col}>
            <div className="panel">
                <div className="panel-hdr">
                    <h2>{title}</h2>                        
                    <div className="panel-toolbar">
                        {collapsible && <button className="btn btn-panel waves-effect waves-themed" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></button>}
                        {fullwidthable && <button className="btn btn-panel waves-effect waves-themed" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></button>}
                    </div>
                </div>
                <div className="panel-container show">
                    <div className="panel-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PagePanel;