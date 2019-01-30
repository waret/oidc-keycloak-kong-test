export const oidcSettings = {
  authority: 'http://login.waret.net/auth/realms/jhipster',
  client_id: 'web_app',
  redirect_uri: 'http://charlie.waret.net/oidc-callback',
  response_type: 'id_token token',
  scope: 'openid profile',
  automaticSilentRenew: true,
  silent_redirect_uri: 'http://charlie.waret.net/silent-renew-oidc.html',
  post_logout_redirect_uri: 'http://charlie.waret.net'
}
