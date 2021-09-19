import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Devices } from '../common/devices';
import { Dto } from '../common/dto';
import { Gateways } from '../common/gateways';

@Injectable({
  providedIn: 'root'
})

// client service that has post, put and delete methods
export class HttpClientService {

  // post and put method url
  sendURL = "http://localhost:8080/api/add"

  constructor(private httpClient: HttpClient) { }

  // post Data Transfer Object
  addBody(dto: Dto): Observable<Dto> {
    {
      console.log(dto, this.sendURL);

      return this.httpClient.post<Dto>(this.sendURL, dto);
    }
  }

  // delete object
  deleteAttr(URL : string) :Observable<unknown> {
    return this.httpClient.delete(URL);
  }

  // update gateway by id and object
  updateGateway(id : number, gateway : Gateways) : Observable<Gateways> {
    const updateURL = `http://localhost:8080/api/gateways/${id}`;
    return this.httpClient.put<Gateways>(updateURL, gateway);
  }

  updateDevice(id : number, devices : Devices) : Observable<Devices> {
    const updateURL = `http://localhost:8080/api/devices/${id}`;
    return this.httpClient.put<Devices>(updateURL, devices);
  }
}
