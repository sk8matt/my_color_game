import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRouteList: Routes = [
  { path: '', component: HomeComponent, },
  {
    path: 'user', loadChildren: () => import('./user/user-routing.module')
      .then(mod => mod.UserRoutingModule)
  },
  {
    path: 'game', loadChildren: () => import('./game/game-routing.module')
      .then(mod => mod.GameRoutingModule)
  },
  {
    path: '**', component: HomeComponent
  }
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRouteList, {
      preloadingStrategy: PreloadAllModules
    }),
  ]
})
export class AppRoutingModule { }
