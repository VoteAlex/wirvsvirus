import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { JobService } from 'src/app/services/job.service';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: [ './landing.component.css' ]
})
export class LandingComponent implements OnInit {
	constructor(private titleService: Title, private jobService: JobService) {}

	jobsCount = 1;

	async ngOnInit(): Promise<void> {
		this.titleService.setTitle('Miteinander füreinander');
		this.jobsCount  = await this.jobService.getJobCount();
	}
}
