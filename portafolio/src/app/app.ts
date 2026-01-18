import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Home } from './features/home/home';
import { Projects } from './features/projects/projects';
import { Contact } from './features/contact/contact';
import { AboutMe } from "./features/about-me/about-me";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Header, Footer, Home, Projects, Contact, AboutMe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('portafolio');
}
