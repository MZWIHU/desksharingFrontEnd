export const environment = {
  production: false,
  keycloak: {
    // Replace with your Keycloak server details
    url: 'http://localhost:8080/auth', // Keycloak server URL
    realm: 'desksharing', // Realm name
    clientId: 'desksharing_frontend', // Client ID (created in step 5)
  }
};
