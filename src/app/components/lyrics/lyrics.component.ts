import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SpotifyService} from "../../../services/spotfy.service";

@Component({
    selector: 'lyrics',
    standalone: true,
    imports: [CommonModule, CommonModule, HttpClientModule,],
    templateUrl: './lyrics.component.html',
    styleUrls: ['./lyrics.component.sass'],
    providers: [SpotifyService]
})
export class LyricsComponent {
    @Input() trackName!: string;
    @Input() lyrics!: string;
    @Input() showLyricsModal: boolean = false;
    @Output() closeModal = new EventEmitter<void>();

    closeLyricsModal() {
        this.closeModal.emit();
    }
}