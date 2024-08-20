import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HomeComponent} from "./components/home/home.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FanAdminComponent} from "./components/fan-admin/fan-admin.component";
import {TrackDetailsComponent} from "./components/track-details/track-details.component";
import {AlbumComponent} from "./components/album/album.component";
import {HttpClientModule} from "@angular/common/http";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {MusicComponent} from "./components/music/music.component";
import {DiscographyComponent} from "./components/discography/discography.component";

@Component({
    selector: 'root',
    standalone: true,
    imports: [
        RouterModule,
        HttpClientModule,
        RouterOutlet,
        FontAwesomeModule,
        HomeComponent,
        NavbarComponent,
        FanAdminComponent,
        TrackDetailsComponent,
        AlbumComponent,
        MusicComponent,
        DiscographyComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    providers: []
})
export class AppComponent {

    constructor(icon: FaIconLibrary) {
        icon.addIconPacks(fas);
    }
}