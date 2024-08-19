import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpotifyService} from "../../../services/spotfy.service";
import {HttpClientModule} from "@angular/common/http";

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

    constructor(private spotifyService: SpotifyService) {}

    ngOnInit() {
        this.spotifyService.searchArtistByName('Linkin Park').subscribe(
            artistId => {
                console.log('Artist ID:', artistId);

                this.spotifyService.getArtist(artistId).subscribe(
                    data => {
                        this.artist = data;
                    },
                    error => {
                        this.errorMessage = 'Could not load artist data';
                        console.error('Error:', error);
                    }
                );

                this.spotifyService.getArtistAlbums(artistId).subscribe(
                    data => {
                        this.albums = data.items;
                    },
                    error => {
                        this.errorMessage = 'Could not load albums';
                        console.error('Error:', error);
                    }
                );

                this.spotifyService.getTopTracks(artistId).subscribe(
                    data => {
                        this.topTracks = data.tracks;
                    },
                    error => {
                        this.errorMessage = 'Could not load top tracks';
                        console.error('Error:', error);
                    }
                );
            },
            error => {
                this.errorMessage = 'Could not find artist';
                console.error('Erro ao buscar artista:', error);
            }
        );
    }
}