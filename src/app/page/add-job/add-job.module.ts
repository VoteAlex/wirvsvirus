import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddJobRoutingModule } from './add-job-routing.module';
import { AddJobComponent } from './add-job.component';

@NgModule({
  declarations: [AddJobComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddJobRoutingModule
  ]
})
export class AddJobModule { }
