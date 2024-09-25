import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SpotifyService} from "../../../services/spotfy.service";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'discography',
    standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    CommonModule,
    HttpClientModule,
    RouterLink
  ],
    templateUrl: './discography.component.html',
    styleUrl: './discography.component.sass',
    providers: [SpotifyService]
})
export class DiscographyComponent implements OnInit {
    artist: any = null;
    albums: any[] = [];
    errorMessage: string = '';

    constructor(private spotifyService: SpotifyService, private router: Router) {
    }

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
                        console.error('Erro:', error);
                    }
                );

                this.spotifyService.getArtistAlbums(artistId).subscribe(
                    data => {
                        this.albums = data.items;
                    },
                    error => {
                        this.errorMessage = 'Não foi possível carregar os álbuns.';
                        console.error('Erro:', error);
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
