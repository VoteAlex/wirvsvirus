import {
  Injectable
} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() {

  }

  async getCurrentPosition(): Promise<Position> {
    return new Promise(
      (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
    ) 
  }


}