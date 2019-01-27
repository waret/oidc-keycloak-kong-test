import { UserManager, WebStorageStateStore, User } from 'oidc-client';

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        const AUTH0_DOMAIN_ISSUER: string = 'http://login.waret.net/auth/realms/jhipster';
        const AUTH0_DOMAIN: string = AUTH0_DOMAIN_ISSUER + '/protocol/openid-connect';

        const settings: any = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: AUTH0_DOMAIN_ISSUER,
            client_id: 'web_app',
            redirect_uri: 'http://foxtrot.waret.net/callback.html',
            response_type: 'id_token token',
            scope: 'openid profile email',
            post_logout_redirect_uri: 'http://foxtrot.waret.net',
            filterProtocolClaims: true,
            metadata: {
                issuer: AUTH0_DOMAIN_ISSUER,
                authorization_endpoint: AUTH0_DOMAIN + '/auth',
                userinfo_endpoint: AUTH0_DOMAIN + '/userinfo',
                end_session_endpoint: AUTH0_DOMAIN + '/logout',
                jwks_uri: AUTH0_DOMAIN + '/certs',
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

    public async isLoggedIn(): Promise<boolean> {
        const user: User = await this.getUser();

        return (user !== null && !user.expired);
    }
}
