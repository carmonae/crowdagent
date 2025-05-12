// Angular imports


// Keycloak imports
import { keycloakConfig, keycloakInitOptions } from '@environments/keycloak.config';
import { KeycloakService } from 'keycloak-angular';

// Firebase imports

// Local imports

export const initializeKeycloak = (keycloakService: KeycloakService) => async () =>
  keycloakService.init({
    config: keycloakConfig,
    initOptions: keycloakInitOptions,
    bearerExcludedUrls: [],
    loadUserProfileAtStartUp: true,
  });