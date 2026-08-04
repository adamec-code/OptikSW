import video from '../scss/optical-store.mov';

function Login({ logoUrl, title }: { logoUrl: string, title: string }) {
    return (
        <>
        <div className="blankpage-form-field">
            <div className="page-logo m-0 w-100 align-items-center justify-content-center rounded border-bottom-left-radius-0 border-bottom-right-radius-0 px-4">
                <a onClick={() => void(0) } className="page-logo-link press-scale-down d-flex align-items-center">
                    <img src={logoUrl} alt={title} aria-roledescription="logo" />
                    <span className="page-logo-text mr-1">{title}</span>
                    <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
                </a>
            </div>
            <div className="card p-4 border-top-left-radius-0 border-top-right-radius-0">
                <form action="intel_analytics_dashboard.html">
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Uživatelské jméno</label>
                        <input type="email" id="username" className="form-control" placeholder="your id or email" value="drlantern@gotbootstrap.com" />
                        <span className="help-block">
                            Vaše jedinečné uživatelské jméno
                        </span>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Heslo</label>
                        <input type="password" id="password" className="form-control" placeholder="password" value="password123" />
                        <span className="help-block">
                            Vaše heslo do aplikace
                        </span>
                    </div>
                    <div className="form-group text-left">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberme" />
                            <label className="custom-control-label" htmlFor="rememberme"> Remember me for the next 30 days</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-default float-right waves-effect waves-themed">Přihlásit se</button>
                </form>
            </div>
            <div className="blankpage-footer text-center">
                <a href="#"><strong>Zapomenuté heslo</strong></a> | <a href="#"><strong>Založit účet</strong></a>
            </div>
        </div>
        <video src={video} datatype="video/mp4" id="bgvid" poster="../vendor/smart-admin-4-5-1/img/backgrounds/clouds.png" 
                playsInline autoPlay muted loop />
        </>
    );
}

export default Login;