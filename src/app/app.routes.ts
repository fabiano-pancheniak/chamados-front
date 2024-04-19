import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { ChamadosComponent } from './components/chamados/chamados.component';

export const routes: Routes = [
    {path: 'auth', component: AuthComponent},
    {path: 'home', component: HomeComponent},
    {path: 'chamados', component: ChamadosComponent}
];
