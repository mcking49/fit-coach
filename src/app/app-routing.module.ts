import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'password-reset', loadChildren: './pages/password-reset/password-reset.module#PasswordResetPageModule' },
  { path: 'client-create', loadChildren: './pages/client-create/client-create.module#ClientCreatePageModule', canActivate: [AuthGuard] },
  { path: 'client-list', loadChildren: './pages/client-list/client-list.module#ClientListPageModule', canActivate: [AuthGuard] },
  {
    path: 'client-detail/:id',
    loadChildren: './pages/client-detail/client-detail.module#ClientDetailPageModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
