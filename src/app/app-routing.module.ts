import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    children: [{
      path: "",
      loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    },
    {
      path: ":id",
      loadChildren: () => import('./aplicacion/aplicacion.module').then( m => m.AplicacionPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'aplicacion',
    loadChildren: () => import('./aplicacion/aplicacion.module').then( m => m.AplicacionPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
