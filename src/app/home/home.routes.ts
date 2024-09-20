import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.page').then( m => m.HomePage),
    children: [
      {
        path: 'hashing',
        loadComponent: () => import('./hashing/hashing.page').then( m => m.HashingPage)
      },
      {
        path: 'encryption',
        loadComponent: () => import('./encryption/encryption.page').then( m => m.EncryptionPage)
      },
      {
        path: '**',
        redirectTo: 'hashing'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];
