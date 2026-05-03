import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Produits } from './components/produits/produits';
import { Machines } from './components/machines/machines';
import { Employes } from './components/employes/employes';
import { Ordres } from './components/ordres/ordres';


export const routes: Routes = [
  { path: '', redirectTo: 'ordres', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'produits', component: Produits },
  { path: 'machines', component: Machines },
  { path: 'employes', component: Employes },
  { path: 'ordres', component: Ordres }
];