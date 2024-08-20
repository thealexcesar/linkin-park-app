import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../../../services/spotfy.service";
import {CommonModule, DatePipe} from "@angular/common";
import {MusicComponent} from "../music/music.component";
import {HttpClientModule} from "@angular/common/http";
import {LyricsComponent} from "../lyrics/lyrics.component";

@Component({
    selector: 'album',
    standalone: true,
    imports: [DatePipe, CommonModule, HttpClientModule, LyricsComponent],
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.sass'],
    providers: [SpotifyService]
})
export class AlbumComponent implements OnInit {
    album: any;
    currentTrack: any;
    showLyricsModal: boolean = false;
    lyrics: string = '';

    constructor(
        private route: ActivatedRoute,
        private spotifyService: SpotifyService
    ) {}

    ngOnInit() {
        const id: string | null = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.spotifyService.getAlbum(id).subscribe(album => {
                this.album = album;
            });
        } else {
            console.error('Album ID is null');
        }
    }


    playTrack(track: any): void {
        this.currentTrack = track;
    }

    openLyricsModal(trackName: string): void {
        this.lyrics = `Letras da música "${trackName}"...`;
        this.showLyricsModal = true;
    }

    closeLyricsModal(): void {
        this.showLyricsModal = false;
    }
}