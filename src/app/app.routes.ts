import { Routes } from '@angular/router';
import { SurveyComponent } from '../app/survey/survey.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home',  component: HomeComponent, data: { animation: 'home' } },
  { path: 'survey',  loadComponent: () => import('../app/survey/survey.component').then(m => SurveyComponent), data: { animation: 'survey' } },
  { path: 'score',  loadComponent: () => import('../app/score/score.component').then(m => m.ScoreComponent), data: { animation: 'score' } },
  { path: '**', component: PageNotFoundComponent }
];
