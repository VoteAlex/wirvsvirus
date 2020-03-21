import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/services/job.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  
  
  jobs: Job[];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {

    this.jobService.getJobs()
    .then(
      data => {
        this.jobs = data;
      },
      err => console.log(err)
    );
  }

}
