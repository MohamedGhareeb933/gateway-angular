import { Component, OnInit } from '@angular/core';
import { Gateways } from 'src/app/common/gateways';
import { GatewaySerice } from 'src/app/services/gateway.service';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-gateways-list',
  templateUrl: './gateways-list.component.html',
  styleUrls: ['./gateways-list.component.css']
})
export class GatewaysListComponent implements OnInit {

  // gateway Container
  gateways : Gateways[] = [];
  clicked : boolean = false;

  constructor(private gatewayService : GatewaySerice, private httpClientService : HttpClientService ) { }

  // call getway service on init
  ngOnInit(): void {
    this.getGatewayService();
  }

  // get all gateway Data and Set the Gateway Container
  getGatewayService() {

    this.gatewayService.getGatewaysList().subscribe(
      data => this.gateways = data
    )
  }

  // Delete gateway by ID-
  deleteGateway(id : number | undefined) {

    const URL = `http://localhost:8080/api/gateways/${id}`;

    this.httpClientService.deleteAttr(URL).subscribe();

    setTimeout(() => window.location.reload(), 100);
  }

}
