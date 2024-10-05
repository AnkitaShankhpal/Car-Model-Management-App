import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarModelManagementComponent } from './car-model-management.component';

@NgModule({
  declarations: [CarModelManagementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CarModelManagementComponent }]) // Set the default route for this module
  ]
})
export class CarModelManagementModule {}
