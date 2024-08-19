import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../../../services/spotfy.service";

@Component({
    selector: 'track-details',
    standalone: true,
    imports: [],
    templateUrl: './track-details.component.html',
    styleUrl: './track-details.component.sass'
})
export class TrackDetailsComponent implements OnInit {
    track: any;
    lyrics: string = '';
    youtubeLink: string = '';

    constructor(
        private route: ActivatedRoute,
        private spotifyService: SpotifyService
    ) {
    }

    ngOnInit() {
        const trackId: string | null = this.route.snapshot.paramMap.get('id');
        if (trackId) {
            this.spotifyService.getTrack(trackId).subscribe(data => {
                this.track = data;
                this.youtubeLink = `https://www.youtube.com/embed?listType=search&list=${this.track.name} ${this.track.artists[0].name}`;

                this.spotifyService.getTrackLyrics(this.track.name, this.track.artists[0].name).subscribe(lyricsData => {
                    this.lyrics = lyricsData.lyrics || 'Lyrics not available';
                });
            });
        }
    }
}
