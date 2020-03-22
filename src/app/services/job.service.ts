import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Job } from './job.model';

import { GeoFirestore } from 'geofirestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  geofirestore: GeoFirestore;

  constructor(private firestore: AngularFirestore) {
    this.geofirestore = new GeoFirestore(firestore.firestore);
  }

  getJobs(limit: number) {
    return this.geofirestore.collection('jobs').limit(limit).get();
  }

  getJobCount() {
    return this.firestore.doc<any>(`counters/lLcm2I58RLbRU7nOKc4h`).get().toPromise().then(doc => {
      return doc.data().jobs;
    })
  }

  getJobById(id: string) {
    return this.geofirestore.collection('jobs').doc(id).get();
  }

  addJob(job: Job) {
    console.log("Try to save job")

    const jobsCollection = this.geofirestore.collection('jobs');

    const insertJob = {
      ...job,
      dateSubmitted: new Date(),
      coordinates: new firebase.firestore.GeoPoint(job.locationLat, job.locationLng)
    };

    return jobsCollection.add(insertJob);
  }

  searchNearby(lat: number, lng: number) {
    return this.geofirestore.collection('jobs').near({ center: new firebase.firestore.GeoPoint(lat, lng), radius: 100 }).get()
  }

}