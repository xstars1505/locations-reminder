import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Location } from '../../../models/location';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'location-modal',
  templateUrl: 'location-modal.html'
})

export class LocationModal {
  location: Location;
  form: FormGroup;

  constructor(private fb: FormBuilder, private navParams: NavParams, private viewCtrl: ViewController) {}

  ionViewWillLoad() {
    this.location = this.navParams.get('data');
    this.form = this.fb.group({
      name: [this.location.label || '']
    });
  }

  updateLocation(formData) {
    this.location.label = formData.name;
    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss(this.location);
  }
}
