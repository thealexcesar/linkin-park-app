import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'linkin-park-app';

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
