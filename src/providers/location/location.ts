import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Location} from '../../models/location';
import { Observable } from 'rxjs/Observable';
import 'rxjs-compat/add/operator/map';

@Injectable()
export class LocationService {

  private locations = this.angularFireDatabase.list<Location>('locations');

  constructor(public angularFireDatabase: AngularFireDatabase) {
  }

  getLocations(): Observable<any[]> {
    return this.locations.snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
  }

  addLocation(location: Location) {
    return this.locations.push(location);
  }

  editLocation(location: Location) {
    return this.locations.update(location.key, location);
  }
}
