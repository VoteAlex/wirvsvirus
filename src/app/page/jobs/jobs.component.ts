import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Subject } from 'rxjs';


import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { Job } from 'src/app/services/job.model';
import { database } from 'firebase';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  zoom = 13
  options: google.maps.MapOptions = {
    maxZoom: 15,
    minZoom: 8,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false

  }

  center = {
    lat: 48.774614,
    lng: 9.1743263
  }
  jobs = new Array()

  job: Job;
 

  constructor(public jobService: JobService) {}
   ngOnInit(): void {
     
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    }); 
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  openInfoWindow(marker: MapMarker, realMarker: any) {
    this.infoWindow.open(marker);

    this.job = realMarker.job;
    this.job.uid = realMarker.uid;

    console.table(this.job)
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
              //console.log(d.data())
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
                job: d.data(),
                uid: d.id
              }
            }
          )
        }
    )
  }
}