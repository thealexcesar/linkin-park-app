import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../../../services/spotfy.service";
import {CommonModule, DatePipe} from "@angular/common";

@Component({
    selector: 'album',
    standalone: true,
    imports: [ DatePipe, CommonModule ],
    templateUrl: './album.component.html',
    styleUrl: './album.component.sass'
})
export class AlbumComponent implements OnInit {
    album: any;

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {}

    ngOnInit(): void {
        const albumId = this.route.snapshot.paramMap.get('id');
        if (albumId) {
            this.spotifyService.getAlbum(albumId).subscribe((album) => {
                this.album = album;
            });
        }
    }

    openSpotify(trackUrl: string) {
        window.open(trackUrl, '_blank');
    }

    // Método para obter a letra da música
    getLyrics(trackName: string, artistName: string) {
        this.spotifyService.getTrackLyrics(trackName, artistName).subscribe((lyrics) => {
            console.log('Lyrics:', lyrics);
            // Aqui você pode abrir um modal ou exibir as letras no template
        });
    }
}