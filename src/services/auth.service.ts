import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private oauthService: OAuthService) {
        this.configure();
    }

    private configure() {
        const authConfig: AuthConfig = {
            issuer: 'https://accounts.spotify.com',
            clientId: environment.spotifyClientId,
            redirectUri: environment.spotifyRedirectUri,
            scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-private',
            responseType: 'code',
            strictDiscoveryDocumentValidation: false,
            oidc: false
        };

        this.oauthService.configure(authConfig);
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }

    public login() {
        this.oauthService.initImplicitFlow();
    }

    public logout() {
        this.oauthService.logOut();
    }

    public isLoggedIn(): boolean {
        return this.oauthService.hasValidAccessToken();
    }
}
