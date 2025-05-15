import { environment } from "@environments/environment";
import { keycloakInitOptions } from "@environments/keycloak.config";
import { KeycloakOptions, KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {

    const options: KeycloakOptions = {
        config: environment.keycloakConfig,
        initOptions: keycloakInitOptions,
        bearerExcludedUrls: []
    };

    const keycloakService = keycloak.init(options)

    return () => keycloakService;
}