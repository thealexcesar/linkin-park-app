import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {SpotifyService} from "../../../services/spotfy.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'fan-admin',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './fan-admin.component.html',
  styleUrl: './fan-admin.component.sass'
})
export class FanAdminComponent implements OnInit{

  constructor(public authService: AuthService, private spotifyService: SpotifyService) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.authService.login();
    }
  }

  addNewWork() {
  }
}
