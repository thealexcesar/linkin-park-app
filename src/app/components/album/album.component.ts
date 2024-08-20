import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../../../services/spotfy.service";
import {CommonModule, DatePipe} from "@angular/common";
import {MusicComponent} from "../music/music.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
    selector: 'album',
    standalone: true,
    imports: [ DatePipe, CommonModule, MusicComponent, HttpClientModule ],
    templateUrl: './album.component.html',
    styleUrl: './album.component.sass',
    providers: [SpotifyService]
})
export class AlbumComponent implements OnInit {
    album: any;

    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {}

    ngOnInit(): void {
        const albumId: string | null = this.route.snapshot.paramMap.get('id');
        if (albumId) {
            this.spotifyService.getAlbum(albumId).subscribe(
                (album) => {
                    this.album = album;
                    console.log('Album carregado:', this.album);
                },
                (error) => {
                    console.error('Erro ao carregar álbum:', error);
                }
            );
        } else {
            console.error('ID do álbum não encontrado na rota.');
        }
    }
}