import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Job } from 'src/app/services/job.model';
import { JobService } from 'src/app/services/job.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {


  jobs: Job[];
  latitude: number;
  longitude: number;
  destroyed$ = new Subject();

  name = new FormControl('');

  updateName() {
    this.name.setValue('Nancy');
  }

  constructor(public jobService: JobService, public geoService: GeolocationService) { }

  async ngOnInit(): Promise<void> {

    try {

      const p = await this.geoService.getCurrentPosition();
      this.latitude = p.coords.latitude;
      this.longitude = p.coords.longitude;

      this.jobService.getJobs().pipe(
        takeUntil(this.destroyed$),
      ).subscribe(jobs => {
        this.jobs = jobs;
      })

    } catch (error) {
      console.error(error);
    }

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}