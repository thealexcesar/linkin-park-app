import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpotifyService} from "../../../services/spotfy.service";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'home',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass'],
    providers: [SpotifyService]
})
export class HomeComponent implements OnInit {
    artist: any = null;
    albums: any[] = [];
    topTracks: any[] = [];
    errorMessage: string = '';

    constructor(private spotifyService: SpotifyService, private router: Router) {}

    ngOnInit() {
        this.spotifyService.searchArtistByName('Linkin Park').subscribe(
            artistId => {
                console.log('Artista ID:', artistId);

                this.spotifyService.getArtist(artistId).subscribe(
                    data => {
                        this.artist = data;
                    },
                    error => {
                        this.errorMessage = 'Não foi possível carregar os dados do artista.';
                        console.error('Error:', error);
                    }
                );

                this.spotifyService.getArtistAlbums(artistId).subscribe(
                    data => {
                        this.albums = data.items;
                    },
                    error => {
                        this.errorMessage = 'Não foi possível carregar os albuns.';
                        console.error('Error:', error);
                    }
                );

                this.spotifyService.getTopTracks(artistId).subscribe(
                    data => {
                        this.topTracks = data.tracks;
                    },
                    error => {
                        this.errorMessage = 'Não foi possível carregar as principais faixas';
                        console.error('Error:', error);
                    }
                );
            },
            error => {
                this.errorMessage = 'Não foi possível encontrar o artista.';
                console.error(this.errorMessage, error);
            }
        );
    }

    goToAlbum(albumId: string) {
        this.router.navigate(['/album', albumId]);
    }
}