import { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {

    url: 'http://localhost:8080',
    realm: 'crowdagent',
    clientId: 'crowdagent-author',
}

const keycloakInitOptions: KeycloakInitOptions = {
    checkLoginIframe: false,
    pkceMethod: 'S256',
    flow: 'standard',
    redirectUri: 'http://localhost:4200/dashboard',
}
export default keycloakConfig;
export { keycloakConfig, keycloakInitOptions };

