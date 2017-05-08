import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MapaPage } from '../mapa/mapa';

import { Zones } from '../../providers/zones';
import { JwtHelper} from 'angular2-jwt';
import { Storage } from '@ionic/storage';

import { ZoneProvider as ZoneProvider } from '../../providers/zone-provider';


/*
  Generated class for the Zones page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-zones',
  templateUrl: 'zones.html',
  providers: [Zones, ZoneProvider] /* Add ngInit Hook */
})
export class ZonesPage {

	/* Should not be any */
	mapPage: any;
	zones: any[];
  token: string;
  zonini: {};

  constructor(
    public storage: Storage,
    public jwtHelper: JwtHelper,
  	public zonesProvider: Zones,
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    private zoneProvider: ZoneProvider) {

  	this.zones = zonesProvider.getZones();
  	this.mapPage = MapaPage;

    //hay q borrar el estatico y resplazarlo por este zonini


    this.storage.ready().then(() => {
      this.storage.get('token').then((val) => {
        this.token = val;
        //deberia traer las zonas
        this.zoneProvider.get(this.token).subscribe( (res)=>{this.zonini = res;}, (err)=>{console.log(err);});
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZonesPage');
  }

  setZone(zone) {
    console.log(zone);
  	this.navCtrl.push(MapaPage, {zone: zone});
  }

}
