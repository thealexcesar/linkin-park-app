import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HomeComponent} from "./components/home/home.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FanAdminComponent} from "./components/fan-admin/fan-admin.component";
import {TrackDetailsComponent} from "./components/track-details/track-details.component";
import {AlbumComponent} from "./components/album/album.component";
import {HttpClientModule} from "@angular/common/http";
import {fas} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      HttpClientModule,
      RouterOutlet,
      FontAwesomeModule,
      HomeComponent,
      NavbarComponent,
      FanAdminComponent,
      TrackDetailsComponent,
      AlbumComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {

    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
}