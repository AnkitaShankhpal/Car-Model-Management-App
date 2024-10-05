import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarModelManagementComponent } from './car-model-management/car-model-management.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const routes: Routes = [
  { path: 'car-model', component: CarModelManagementComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'car-model', loadChildren: () => import('./car-model-management/car-model-management.module').then(m => m.CarModelManagementModule) },
  { path: '**', redirectTo: '/car-model' } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
