import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gateways } from '../common/gateways';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// get gateways list or single gateway object
export class GatewaySerice {

  // base url for gateway entity - working with back end here
  private baseURL : string  = "http://localhost:8080/api/gateways";

  constructor(private httpClient : HttpClient) { }

  // Gateay List observable - get list of Gateay Object from Base url and map it Gateway list
  getGatewaysList() : Observable<Gateways[]> {

    return this.httpClient.get<mapGatewaysJson>(this.baseURL).pipe(
      map( indexedDB => indexedDB._embedded.gateways)
    );
  }

  // get single gateway by Id
  getGateway(id : number) : Observable<Gateways> {

    const URL : string = `${this.baseURL}/${id}`;
    return this.httpClient.get<Gateways>(URL);
  }

}

export interface mapGatewaysJson {
  _embedded : {
    gateways : Gateways[]
  }
}

