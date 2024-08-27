import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private router: Router
  ) {

  }

  survey() {
    console.log('survey clicked');
    this.router.navigate(['/survey']);
  }

  score() {
    console.log('score clicked');
    this.router.navigate(['/score']);
  }

}
