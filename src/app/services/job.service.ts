import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private firestore: AngularFirestore) { }

  getJobs(limit: number): Observable<Job[]> {
    return this.firestore.collection<Job>('jobs', ref => ref
      .limit(limit)
    ).valueChanges()
  }

  addJob(job: Job) {
    const jobsCollection = this.firestore.collection<Job>('jobs');

    const insertJob = {
      ...job,
      dateSubmitted: new Date(),
    };

    jobsCollection.add(insertJob);
  }


}