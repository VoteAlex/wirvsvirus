import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddJobRoutingModule } from './add-job-routing.module';
import { AddJobComponent } from './add-job.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [AddJobComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AddJobRoutingModule
  ]
})
export class AddJobModule { }
