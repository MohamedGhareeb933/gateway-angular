import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Devices } from '../common/devices';

@Injectable({
  providedIn: 'root'
})

// get deivce list - single device by Id
export class DeviceService {

  // base url for Device entity and search url to get Devices by gateway Id
  baseURL : string = "http://localhost:8080/api/devices/";
  searchURl : string = "search/findAllDevicesByGatewaysId?id=";

  constructor(private httpClient : HttpClient) { }

  // observables of device list - get list of devices and map it
  getDevicesList(id : number) : Observable<Devices[]> {
    const url = `${this.baseURL}${this.searchURl}${id}`;

    return this.httpClient.get<mapDeviceJson>(url).pipe(
      map(indexedDB => indexedDB._embedded.devices)
    )
  }

  // get single device
  getDevice(id : number) : Observable<Devices> {
    const URL : string = `${this.baseURL}${id}`;
    return this.httpClient.get<Devices>(URL);
  }
}

// map the Backend Json Objects to Device list
export interface mapDeviceJson {
  _embedded : {
    devices : Devices[]
  }
}
