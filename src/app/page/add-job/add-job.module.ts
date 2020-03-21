import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AddJobRoutingModule } from './add-job-routing.module';
import { AddJobComponent } from './add-job.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";


@NgModule({
  declarations: [AddJobComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AddJobRoutingModule,
    CKEditorModule,
    GooglePlaceModule,
  ]
})
export class AddJobModule { }
