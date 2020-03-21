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

  getJobs(): Observable<Job[]> {
    return this.firestore.collection<Job>('jobs').valueChanges();
  }


}