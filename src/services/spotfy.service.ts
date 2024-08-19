import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    private baseUrl: string = 'https://api.spotify.com/v1';
    private accessToken: string = '';
    private tokenExpirationTime: number = 0;
    private clientId: string = environment.spotifyClientId;
    private clientSecret: string = environment.spotifyClientSecret;

    constructor(private http: HttpClient) {}

    private getHeaders(): Observable<HttpHeaders> {
        return this.getAccessToken().pipe(
            map(token => new HttpHeaders({'Authorization': `Bearer ${token}`}))
        );
    }

    private getAccessToken(): Observable<string> {
        if (this.accessToken && Date.now() < this.tokenExpirationTime) {
            return from([this.accessToken]);
        } else {
            return this.requestNewToken().pipe(
                map(response => {
                    this.accessToken = response.access_token;
                    this.tokenExpirationTime = Date.now() + response.expires_in * 1000;
                    return this.accessToken;
                })
            );
        }
    }

    private requestNewToken(): Observable<any> {
        const auth: string = `${this.clientId}:${this.clientSecret}`;
        const encodedAuth: string = btoa(auth);
        return this.http.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {'Authorization': `Basic ${encodedAuth}`, 'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    searchArtistByName(artistName: string): Observable<string> {
        return this.getHeaders().pipe(
            switchMap(headers => this.http.get(`${this.baseUrl}/search`, {headers, params: { q: artistName, type: 'artist', limit: '1' }})),
            map((response: any) => response.artists.items.length > 0 ? response.artists.items[0].id : throwError(() => new Error('Artista não encontrado.')))
        );
    }

    getArtist(artistId: string): Observable<any> {
        return this.getHeaders().pipe(switchMap(headers => this.http.get(`${this.baseUrl}/artists/${artistId}`, { headers })));
    }

    getArtistAlbums(artistId: string): Observable<any> {
        return this.getHeaders().pipe(switchMap(headers => this.http.get(`${this.baseUrl}/artists/${artistId}/albums`, { headers })));
    }

    getAlbum(albumId: string): Observable<any> {
        return this.getHeaders().pipe(switchMap(headers => this.http.get(`${this.baseUrl}/albums/${albumId}`, { headers })));
    }

    getTrack(trackId: string): Observable<any> {
        return this.getHeaders().pipe(switchMap(headers => this.http.get(`${this.baseUrl}/tracks/${trackId}`, { headers })));
    }

    getTrackLyrics(trackName: string, artistName: string): Observable<any> {
        const encodedTrackName = encodeURIComponent(trackName);
        const encodedArtistName = encodeURIComponent(artistName);
        const lyricsUrl = `https://api.lyrics.ovh/v1/${encodedArtistName}/${encodedTrackName}`;
        return this.http.get(lyricsUrl).pipe(catchError(error => throwError(() => new Error('Falha ao buscar a letra da música.'))));
    }

    getTopTracks(artistId: string): Observable<any> {
        return this.getHeaders().pipe(switchMap(headers => this.http.get(`${this.baseUrl}/artists/${artistId}/top-tracks?market=US`, { headers })));
    }
}
