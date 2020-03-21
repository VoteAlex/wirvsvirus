import {
  Injectable
} from '@angular/core';
import {
  Job
} from './job.model';
import 'firebase/firestore';
import {
  AngularFirestore
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private firestore: AngularFirestore) {}

  async getJobs() {

    const j1 = < Job > {
      description: "Test Description",
      title: "Title",
      uid: "asdasd"
    }

    return [j1, j1, j1];

  }


}