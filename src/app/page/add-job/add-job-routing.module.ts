import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddJobComponent } from './add-job.component';

const routes: Routes = [{ path: '', component: AddJobComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddJobRoutingModule { }
