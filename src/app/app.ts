import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {Pessoas} from './pessoas/pessoas'

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ RouterOutlet,
    RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
