import { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {

    url: 'http://localhost:8080',
    realm: 'crowdagent',
    clientId: 'crowdagent',
}

const keycloakInitOptions: KeycloakInitOptions = {
    checkLoginIframe: false,
    pkceMethod: 'S256',
    flow: 'standard',
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    redirectUri: 'http://localhost:4200/landing',
}

const keycloakFeatures = {
    withAutoRefreshToken: () => ({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
    })
};


export default keycloakConfig;
export { keycloakConfig, keycloakFeatures, keycloakInitOptions };

