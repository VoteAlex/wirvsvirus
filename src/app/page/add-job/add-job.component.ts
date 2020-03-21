import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Job } from 'src/app/services/job.model';
import { JobService } from 'src/app/services/job.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-add-job',
	templateUrl: './add-job.component.html',
	styleUrls: [ './add-job.component.css' ]
})
export class AddJobComponent implements OnInit, OnDestroy {
	jobs: Job[];
	latitude: number;
	longitude: number;
	destroyed$ = new Subject();

	@Input() count: number = 0;

	jobForm = new FormGroup({
		title: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(300) ]),
		company: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(300) ]),
		address: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(300) ]),
		city: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(300) ]),
		email: new FormControl('', [ Validators.required, Validators.maxLength(300) ]),
		fullDescription: new FormControl('', [ Validators.required, Validators.maxLength(300) ])
	});

	constructor(public jobService: JobService, public geoService: GeolocationService, private titleService: Title) {}

	async ngOnInit(): Promise<void> {
		this.titleService.setTitle('Job inserieren | Miteinander füreinander');

		try {
		} catch (error) {
			console.error(error);
		}
	}

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	@ViewChild('lit-place-input') place: NgModel;

	onSubmit() {
		const point = document.querySelector('lit-place-input').getAttribute('latlng') as any;
    
    const user = this.jobForm.value as Job;
		user.locationLat = point.lat;
		user.locationLng = point.lng;

		this.jobService
			.addJob(user)
			.then(() => {
				alert('Dein Job Insert wurde erfolgreich angelegt!');
			})
			.catch((err) => {
				console.error(err);
				alert('Etwas ist schiefgelaufen beim Anlegen deines Inserates!');
			})
			.finally(() => {
				// reset form
				this.jobForm.reset();
			});
	}
}
