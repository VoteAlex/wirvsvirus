import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    InfoRoutingModule
  ]
})
export class InfoModule { }
