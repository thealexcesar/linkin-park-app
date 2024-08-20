import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SpotifyService} from "../../../services/spotfy.service";
import {CommonModule, DatePipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {LyricsComponent} from "../lyrics/lyrics.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faMusic, faPlay} from "@fortawesome/free-solid-svg-icons";
import {faSpotify} from "@fortawesome/free-brands-svg-icons";

@Component({
    selector: 'album',
    standalone: true,
    imports: [DatePipe, CommonModule, HttpClientModule, LyricsComponent, FontAwesomeModule],
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.sass'],
    providers: [SpotifyService]
})
export class AlbumComponent implements OnInit {
    album: any;
    currentTrack: any;
    showLyricsModal: boolean = false;
    lyrics: string = '';
    spotifyUrl: string = '';
    private audio: HTMLAudioElement | null = null;

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private icon: FaIconLibrary) {
        this.icon.addIcons(faPlay, faMusic, faSpotify);
    }

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
        if (this.audio) {
            this.audio.pause();
        }

        this.currentTrack = track;
        this.spotifyUrl = track.external_urls.spotify;
        this.audio = new Audio(track.preview_url);
        this.audio.play();
    }

    openLyricsModal(track: any): void {
        this.currentTrack = track;
        this.lyrics = `Letras da música "${track.name}"...`;
        this.showLyricsModal = true;
    }

    closeLyricsModal(): void {
        this.showLyricsModal = false;
    }

    protected readonly faPlay = faPlay;
    protected readonly faSpotify = faSpotify;
    protected readonly faMusic = faMusic;
}