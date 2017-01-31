import { Component, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { ViewController } from 'ionic-angular';

declare var google;
var places: any[]= [];


@Component({
  selector: 'page-places',
  templateUrl: 'places.html'
})
export class PlacesPage{
  map: any;
  infoWindow: any;
  service: any;
  searchText: any;
  @ViewChild('map') mapElement: ElementRef;


  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
    this.loadMap();
    places=[];
  }
    loadMap(){

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(-34.9290, 138.6010);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.infoWindow = new google.maps.InfoWindow();
      this.service = new google.maps.places.PlacesService(this.map);
      // this.map.addListener('idle', this.performSearch);
      

    }, (err) => {
      console.log(err);
    });
  }

  search(){
    this.performSearch();
    if (places.length>0){
      this.viewCtrl.dismiss(places);
    }
  }
    performSearch() {
      let centerSfo = new google.maps.LatLng(37.7749295, -122.41941550000001);
      let circle = new google.maps.Circle({radius: 1000, center: centerSfo});
      let bounds = circle.getBounds();
    var request = {
      bounds: bounds,
      keyword: this.searchText
    };
    this.service.radarSearch(request, this.callback);
  }

  callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      console.error(status);
      return;
    }else{
      places = results.slice(0,5)
      // this.viewCtrl.dismiss(places)

    }
  }


  dismiss(){
    this.viewCtrl.dismiss();
  }

}
