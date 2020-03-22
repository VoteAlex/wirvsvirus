import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Job } from 'src/app/services/job.model';
import { JobService } from 'src/app/services/job.service';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
	public Editor = ClassicEditor;

	@Input() count: number = 0;

	jobForm = new FormGroup({
		title: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(300) ]),
		company: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(300) ]),
		address: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(300) ]),
		email: new FormControl('', [ Validators.required, Validators.maxLength(300) ]),
		fullDescription: new FormControl('', [ Validators.required, Validators.maxLength(300) ])
	});

	constructor(
		public jobService: JobService,
		public geoService: GeolocationService,
		private titleService: Title,
		private _snackBar: MatSnackBar,
		private router: Router
	) {}

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
		const point = JSON.parse(document.querySelector('lit-place-input').getAttribute('latlng')) as any;
		const place = JSON.parse(document.querySelector('lit-place-input').getAttribute('place')) as any;
		const job = this.jobForm.value as Job;
		job.locationLat = point.lat;
		job.locationLng = point.lng;
		job.place = place;

		this.jobService
			.addJob(job)
			.then(() => {
				this._snackBar.open('🚀🚀 Dein Job Insert wurde erfolgreich angelegt!', '', { duration: 2000 });
			})
			.catch((err) => {
				console.error(err);
				this._snackBar.open('💥💥 Etwas ist schiefgelaufen beim Anlegen deines Inserates!', '', {
					duration: 2000
				});
			})
			.finally(() => {
				// reset form
				this.jobForm.reset();
				this.router.navigate([ 'jobs' ]);
			});
	}
}
