import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
	{ path: '', loadChildren: () => import('./page/landing/landing.module').then((m) => m.LandingModule) },
	{ path: 'jobs', loadChildren: () => import('./page/jobs/jobs.module').then((m) => m.JobsModule) },
	{ path: 'add', loadChildren: () => import('./page/add-job/add-job.module').then((m) => m.AddJobModule) },
	{ path: 'info', loadChildren: () => import('./page/info/info.module').then((m) => m.InfoModule)},
	{ path: '**', redirectTo: "/" },

];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
