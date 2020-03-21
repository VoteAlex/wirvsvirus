import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private firestore: AngularFirestore) { }

  getJobs(limit: number) {
    return this.firestore.collection<Job>('jobs', ref => ref
      .limit(limit)
    ).get();
  }

  getJobById(id: string) {
    return this.firestore.collection<Job>('jobs').doc(id).get();
  }

  addJob(job: Job) {
    const jobsCollection = this.firestore.collection<Job>('jobs');

    const insertJob = {
      ...job,
      dateSubmitted: new Date(),
    };

    return jobsCollection.add(insertJob);
  }


}