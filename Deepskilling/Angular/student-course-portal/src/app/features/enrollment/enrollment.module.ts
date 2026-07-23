import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentRoutingModule } from './enrollment-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EnrollmentRoutingModule
    // Since the components are standalone, we do not declare them here.
    // They are simply routed to via EnrollmentRoutingModule.
  ]
})
export class EnrollmentModule { }
