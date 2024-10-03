import { Routes } from '@angular/router';
import { DummyComponent } from './dummy.component';
import { Error404Component } from './error404.component';

export const routes: Routes = [
  { path: '', component: DummyComponent },
  { path: 'home', component: DummyComponent },
  { path: 'error', component: Error404Component },
  { path: 'redirect', redirectTo: 'home' },
  { path: 'user/:id', component: DummyComponent },
];
