import { Routes } from '@angular/router';
import { Pessoas } from './pessoas/pessoas';
import { Consulta } from './pessoas/consulta/consulta';
import { Editar } from './pessoas/editar/editar';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cadastro',
        pathMatch: 'full'
      },
    
      {
        path: 'cadastro',
        component: Pessoas
      },
    
      {
        path: 'consulta',
        component: Consulta
      },

      {
        path: 'editar/:id',
        component: Editar
      }
    
];
