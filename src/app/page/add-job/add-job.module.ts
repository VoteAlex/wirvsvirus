import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AddJobRoutingModule } from './add-job-routing.module';
import { AddJobComponent } from './add-job.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AddJobComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AddJobRoutingModule,
    CKEditorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AddJobModule { }
