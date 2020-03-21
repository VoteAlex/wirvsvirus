import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    MaterialModule,
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
