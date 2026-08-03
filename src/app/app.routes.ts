import { Routes } from '@angular/router';
import { Pessoas } from './pessoas/pessoas';
import { Consulta } from './pessoas/consulta/consulta';
import { Editar } from './pessoas/editar/editar';
import { Component } from '../../node_modules/@angular/compiler/types/compiler';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'consulta',
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
        path: 'editar',
        component: Editar
      }
    
];
