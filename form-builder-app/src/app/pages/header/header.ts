import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  activeLink: string = '';

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  saveAndNext() {
    

  }

  cancel() {}

  PublishForm(){}

  preview(){}
}
