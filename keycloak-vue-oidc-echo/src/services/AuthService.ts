import { UserManager, WebStorageStateStore, User } from 'oidc-client';

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        const AUTH0_DOMAIN: string = 'http://login.waret.net/auth/realms/jhipster';
        const AUTH0_DOMAIN2: string = AUTH0_DOMAIN + '/protocol/openid-connect';

        const settings: any = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: AUTH0_DOMAIN,
            client_id: 'web_app',
            redirect_uri: 'http://echo.waret.net/callback.html',
            response_type: 'id_token token',
            scope: 'openid profile',
            post_logout_redirect_uri: 'http://echo.waret.net',
            filterProtocolClaims: true,
            metadata: {
                issuer: AUTH0_DOMAIN,
                authorization_endpoint: AUTH0_DOMAIN2 + '/auth',
                userinfo_endpoint: AUTH0_DOMAIN2 + '/userinfo',
                end_session_endpoint: AUTH0_DOMAIN2 + '/logout',
                jwks_uri: AUTH0_DOMAIN2 + '/certs',
            },
        };

        this.userManager = new UserManager(settings);
    }

    public getUser(): Promise<User> {
        return this.userManager.getUser();
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }
}
