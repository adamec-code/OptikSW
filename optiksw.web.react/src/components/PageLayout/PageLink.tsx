import { Link, useLocation } from "react-router-dom";

function PageLink({ url, title, icon }: { url: string, title: string, icon: string }) {

    const location = useLocation();
    const isHomePage = url === "/" && location.pathname === url;

    return (
        <li className={isHomePage || url !== "/" && location.pathname.startsWith(url) ? "active" : ""}>
            <Link to={url}>
                <i className={`fal fa-${icon}`}></i>
                <span className="nav-link-text" data-i18n={"nav." + title.toLowerCase()}>{title}</span>              
            </Link>
        </li>
    );
}

export default PageLink;