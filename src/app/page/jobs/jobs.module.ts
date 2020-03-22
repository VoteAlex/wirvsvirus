import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { DetailComponent } from './detail/detail.component';

import { GoogleMapsModule } from '@angular/google-maps'
import { GooglePlaceModule } from "ngx-google-places-autocomplete";


@NgModule({
  declarations: [JobsComponent, DetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    MaterialModule,
    GoogleMapsModule,
    GooglePlaceModule
  ],
})
export class JobsModule { }
