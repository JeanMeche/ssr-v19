import { Routes } from '@angular/router';
import { DummyComponent } from './dummy.component';

export const routes: Routes = [
  { path: '', component: DummyComponent },
  { path: 'home', component: DummyComponent },
  { path: 'redirect', redirectTo: 'home' },
  { path: 'user/:id', component: DummyComponent },
];
