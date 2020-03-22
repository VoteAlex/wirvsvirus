import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/services/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  job: Job;

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const jobId = this.activatedRoute.snapshot.params.id;
    this.jobService.getJobById(jobId).then(job => {
      console.log(job.data());
      this.job = job.data() as Job;
    }).catch(error => {
      console.error(error);
    });
  }

  sendMail(email: string) {
    const mailText = `mailto:${email}?subject=Wir-vs-Virus`;
    window.location.href = mailText;
  }

}
