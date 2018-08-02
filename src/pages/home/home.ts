import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { LocationService } from '../../providers/location/location';
import { Location} from '../../models/location';
import { LocationModal } from './modals/location-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number = 51.678418;
  lng: number = 7.809007;
  locations: Observable<Location[]>;

  constructor(
    private modalCtrl : ModalController,
    private locationService: LocationService
  ) {
    this.locations = locationService.getLocations();
  }

  async clickedMarker(location: Location) {
    let modal = await this.modalCtrl.create(LocationModal, { data: location });
    await modal.present();

    modal.onDidDismiss(data => {
      if (data) {
        location = data;
        this.locationService.editLocation(location);
      }
    });
  }


  markerDragEnd(location: Location, $event) {
    location.lat = $event.coords.lat;
    location.lng = $event.coords.lng;
    this.locationService.editLocation(location);
  }

  mapClicked($event) {
    this.locationService.addLocation(
      {
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: 'new place',
        draggable: true
      });
  }

}
