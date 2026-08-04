import React from "react";

function PageNavigation({ children }: { children: React.ReactNode }) {
    return (
        <nav id="js-primary-nav" className="primary-nav" role="navigation">
            {children}
        </nav>
    );
}

export default PageNavigation;