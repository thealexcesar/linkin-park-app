import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
    selector: 'lyrics',
    standalone: true,
    imports: [ CommonModule, HttpClientModule ],
    templateUrl: './lyrics.component.html',
    styleUrl: './lyrics.component.sass'
})
export class LyricsComponent implements OnInit {
    @Input() lyrics: string = '';
    @Input() trackName: string = '';
    @Output() close = new EventEmitter<void>();

    ngOnInit(): void {
        console.log('Letras carregadas por:', this.trackName);
    }

    closeLyricsModal(): void {
        this.close.emit();
    }
}