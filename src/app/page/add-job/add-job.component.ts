import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Job } from 'src/app/services/job.model';
import { JobService } from 'src/app/services/job.service';
import { Title } from '@angular/platform-browser';

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
    company: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]),
    city: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    fullDescription: new FormControl('', [Validators.required, Validators.maxLength(300)]),
  });

  constructor(public jobService: JobService, public geoService: GeolocationService, private titleService: Title) {}

  async ngOnInit(): Promise<void> {

    this.titleService.setTitle('Job inserieren | Miteinander füreinander');


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
    this.jobService.addJob(this.jobForm.value).then(() => {
      alert('Dein Job Insert wurde erfolgreich angelegt!');
    }).catch(err => {
      console.error(err);
      alert('Etwas ist schiefgelaufen beim Anlegen deines Inserates!');
    }).finally(() => {
      // reset form
      this.jobForm.reset();
    })
  }

}