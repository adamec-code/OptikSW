import { Outlet } from "react-router-dom";
import PageSidebar from "../components/PageLayout/PageSidebar";
import PageWrapper from "../components/PageLayout/PageWrapper";
import PageLogo from "../components/PageLayout/PageLogo";
import PageNavigation from "../components/PageLayout/PageNavigation";
import PageLink from "../components/PageLayout/PageLink";

function Layout() {

    return (
        <PageWrapper>
            <PageSidebar>

                <PageLogo logoImgUrl="/vendor/smart-admin-4-5-1/img/logo.png" logoTitle="Optik SW" />

                <PageNavigation>
                    <div className="nav-filter">
                        <div className="position-relative">
                            <input type="text" id="nav_filter_input" placeholder="Filter menu" className="form-control" tabIndex={0} />
                            <a href="#" onClick={ () => false } className="btn-primary btn-search-close js-waves-off" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar">
                                <i className="fal fa-chevron-up"></i>
                            </a>
                        </div>
                    </div>
                    <div className="info-card">
                        <img src="/vendor/smart-admin-4-5-1/img/demo/avatars/avatar-admin.png" className="profile-image rounded-circle" alt="Dr. Codex Lantern" />
                        <div className="info-card-text">
                            <a href="#" className="d-flex align-items-center text-white">
                                <span className="text-truncate text-truncate-sm d-inline-block">
                                    Dr. Codex Lantern
                                </span>
                            </a>
                            <span className="d-inline-block text-truncate text-truncate-sm">Toronto, Canada</span>
                        </div>
                        <img src="/vendor/smart-admin-4-5-1/img/card-backgrounds/cover-2-lg.png" className="cover" alt="cover" />
                        <a href="#" onClick={ () => false } className="pull-trigger-btn" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar" data-focus="nav_filter_input">
                            <i className="fal fa-angle-down"></i>
                        </a>
                    </div>

                    <ul id="js-nav-menu" className="nav-menu">
                        <PageLink url="/" title="Domů" icon="globe" />
                        <PageLink url="/orders" title="Objednávky" icon="briefcase" />
                        <PageLink url="/customers" title="Zákazníci" icon="user" />
                    </ul>
                </PageNavigation>
            </PageSidebar>

            <div className="page-content-wrapper">
                <header className="page-header" role="banner"></header>
                <main id="js-page-content" role="main" className="page-content">
                    <Outlet />
                </main>
            </div>
        </PageWrapper>
    )
  };
  
  export default Layout;
  