import {
  Component,
  OnInit
} from '@angular/core';
import {
  JobService
} from 'src/app/services/job.service';
import {
  Job
} from 'src/app/services/job.model';
import {
  GeolocationService
} from 'src/app/services/geolocation.service';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {


  jobs: Job[];
  latitude: number;
  longitude: number;

  constructor(public jobService: JobService, public geoService: GeolocationService) {}

  async ngOnInit(): Promise < void > {

    try {

      const p  = await this.geoService.getCurrentPosition();
      this.latitude = p.coords.latitude;
      this.longitude = p.coords.longitude;
      
      this.jobs = await this.jobService.getJobs();

    } catch (error) {
      console.error(error);
    }

  }

}