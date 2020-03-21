import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Job } from 'src/app/services/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit, OnDestroy {
  jobs: Job[];
  latitude: number;
  longitude: number;
  destroyed$ = new Subject();

  jobForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    fullDescription: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    fulltime: new FormControl('', [Validators.required]),
    jobExperience: new FormControl('', [Validators.maxLength(300)]),
    wage: new FormControl(''),
    workHoursPerWeek: new FormControl(''),
  });

  constructor(public jobService: JobService, public geoService: GeolocationService) { }

  async ngOnInit(): Promise<void> {

    try {
      const p = await this.geoService.getCurrentPosition();
    } catch (error) {
      console.error(error);
    }

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit() {
    this.jobService.addJob(this.jobForm.value);
  }

}