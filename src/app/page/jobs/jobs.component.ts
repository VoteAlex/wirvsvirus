import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Subject } from 'rxjs';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Job } from 'src/app/services/job.model';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: [ './jobs.component.css' ]
})
export class JobsComponent implements OnInit, OnDestroy {

  placesOptions = {
		componentRestrictions: {country: 'de'}
	};

	destroyed$ = new Subject();
	zoom = 11;
	options: google.maps.MapOptions = {
		maxZoom: 15,
		minZoom: 10,
		fullscreenControl: false,
		mapTypeControl: false,
		streetViewControl: false
	};

	center = {
		lat: 48.774614,
		lng: 9.1743263
	};
	jobs = new Array();

	job: Job;

	constructor(public jobService: JobService) {}
	ngOnInit(): void {
    
		navigator.geolocation.getCurrentPosition((position) => {
			this.center = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			this.searchJobs("init");
		});
	}

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	@ViewChild(MapInfoWindow, { static: false })
	infoWindow: MapInfoWindow;

	openInfoWindow(marker: MapMarker, realMarker: any) {
		this.infoWindow.open(marker);
		this.job = realMarker.job;
		this.job.uid = realMarker.uid;
	}

	searchJobs(evt: any) {
		if (evt !== 'init') {
			this.center = {
				lat: evt.geometry.location.lat(),
				lng: evt.geometry.location.lng()
			};
    }
    
		this.jobService.searchNearby(this.center.lat, this.center.lng).then((j) => {
			this.jobs = j.docs.map((d) => {
				return {
					position: {
						lat: d.data().coordinates.latitude,
						lng: d.data().coordinates.longitude
					},
					title: d.data().title,
					job: d.data(),
					uid: d.id
				};
			});
		});
	}
}
