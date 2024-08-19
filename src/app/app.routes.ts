import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AlbumComponent} from "./components/album/album.component";
import {TrackDetailsComponent} from "./components/track-details/track-details.component";
import {FanAdminComponent} from "./components/fan-admin/fan-admin.component";
import {DiscographyComponent} from "./components/discography/discography.component";
import {AboutComponent} from "./components/about/about.component";
import {LyricsComponent} from "./components/lyrics/lyrics.component";

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'album/:id', component: AlbumComponent },
    { path: 'track/:id', component: TrackDetailsComponent },
    { path: 'fan-admin', component: FanAdminComponent },
    { path: 'discography', component: DiscographyComponent },
    { path: 'about', component: AboutComponent },
    { path: 'lyrics', component: LyricsComponent }
];
