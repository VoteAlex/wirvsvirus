import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Job } from 'src/app/services/job.model';
import { JobService } from 'src/app/services/job.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';

import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

import {MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();

  center = {
    lat: 	52.520008,
    lng: 13.404954
  }
  jobs = new Array()

  jobTitle: string
  jobDescription: string

  constructor(public jobService: JobService, public geoService: GeolocationService) { }
   ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  openInfoWindow(marker: MapMarker, realMarker: any) {
    this.infoWindow.open(marker);
    this.jobTitle = realMarker.title
    this.jobDescription = realMarker.job.fullDescription
  }

  searchJobs(evt: any) {
    this.center = {
      lat: evt.geometry.location.lat(),
      lng: evt.geometry.location.lng(),
    }

    this.jobService.searchNearby(this.center.lat, this.center.lng)
      .then(
        j => {
          j.docs.forEach(
            d => {
              console.log(d.data())
            })
          this.jobs = j.docs.map(
            d => {
              return {
                position: {
                  lat: d.data().coordinates.latitude,
                  lng: d.data().coordinates.longitude,
                },
                label: {
                  text: d.data().title,
                },
                title: d.data().title,
                options: { animation: google.maps.Animation.BOUNCE },
                job: d.data()
              }
            }
          )
        }
    )
  }
}