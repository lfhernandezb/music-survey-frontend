import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'music-survey';

  constructor(
    private router: Router
  )
  {}

  ngOnInit(): void {
    this.router.navigate(['/home']);
  }

}
