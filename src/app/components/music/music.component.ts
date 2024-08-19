import {Component, Input} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {SpotifyService} from "../../../services/spotfy.service";
import {CommonModule} from "@angular/common";
import {LyricsComponent} from "../lyrics/lyrics.component";
import {SafeUrlPipe} from "../../pipes/safe-url.pipe";

@Component({
    selector: 'music',
    standalone: true,
    imports: [ HttpClientModule, CommonModule, LyricsComponent, SafeUrlPipe ],
    templateUrl: './music.component.html',
    styleUrl: './music.component.sass',
    providers: [SpotifyService]
})
export class MusicComponent {
    @Input() tracks: any[] = [];
    currentTrack: any = null;
    displayLyrics: boolean = false;

    constructor(private spotifyService: SpotifyService) {}

    playTrack(track: any): void {
        this.currentTrack = track;
        this.displayLyrics = false;
        if (track.preview_url) {
            this.currentTrack.preview_url = track.preview_url;
        }
    }

    showLyrics(track: any): void {
        if (!track?.name || !track.artists?.[0]?.name) {
            console.error('\n' +
                'Os dados do rastreamento estão incompletos:', track);
            return;
        }
        this.spotifyService.getTrackLyrics(track.name, track.artists[0].name).subscribe({
            next: lyrics => {
                if (lyrics) {
                    track.lyrics = lyrics;
                    this.currentTrack = track;
                    this.displayLyrics = true;
                } else {
                    console.error('Letra não encontrada para a faixa:', track.name);
                }
            },
            error: err => console.error('Erro ao buscar a letra da música:', err)
        });
    }

    openSpotify(track: any): void {
        window.open(track.external_urls.spotify, '_blank');
    }

    closeLyricsModal(): void {
        this.displayLyrics = false;
    }
}
