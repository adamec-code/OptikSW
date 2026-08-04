import React from "react";

function PageSidebar({ children }: { children: React.ReactNode }) {
    return (
        <aside className="page-sidebar">
            {children}
        </aside>
    );
}

export default PageSidebar;