import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { LocationService } from '../../providers/location/location';
import { Location} from '../../models/location';
import { LocationModal } from './modals/location-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number;
  lng: number;
  locations: Observable<Location[]>;

  constructor(
    private modalCtrl : ModalController,
    private geolocation: Geolocation,
    private locationService: LocationService
  ) {
    this.locations = locationService.getLocations();
  }

  ionViewDidLoad() {
    this.getLocation();
  }

  async getLocation(){
    try {
      const currentPosition = await this.geolocation.getCurrentPosition();
      this.lat = currentPosition.coords.latitude;
      this.lng = currentPosition.coords.longitude;
    } catch(error) {
      console.log('Error getting location', error);
    }
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
