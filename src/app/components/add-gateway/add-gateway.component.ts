import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dto } from 'src/app/common/dto';
import { Gateways } from 'src/app/common/gateways';
import { GatewaySerice } from 'src/app/services/gateway.service';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-add-gateway',
  templateUrl: './add-gateway.component.html',
  styleUrls: ['./add-gateway.component.css']
})
export class AddGatewayComponent implements OnInit {

  // Gateway Prop
  name?: string;
  ipAddress?: string;
  gatewayId: number = 0;
  gateway: Gateways = new Gateways();

  // url has Gateway Id for Update
  clicked: boolean = false;
  UrlHasId: boolean = false;


  constructor(private httpClientService: HttpClientService, private route: ActivatedRoute,
    private gatewayService: GatewaySerice) { }

    // if the url param has gateway id - do some updates first
  ngOnInit(): void {

    this.UrlHasId = this.route.snapshot.paramMap.has('id');

    if (this.UrlHasId) {
      this.onUpdate();
    }

  }

  // if the url param has gateway id update/put otherwise add/post
  addOrUpdate() {

    if (this.UrlHasId) {
      this.update();
    } else {
      this.add();
    }

  }

  // add or post - send Data Transfer object that has gateway Object
  add() {

    let dto: Dto = new Dto(new Gateways(this.name, this.ipAddress));

    this.httpClientService.addBody(dto).subscribe();

  }

  // update or put specific gateway by Id
  update() {

    let updateGateway: Gateways = this.gateway;

    updateGateway.name = this.name;
    updateGateway.ipAddress = this.ipAddress;

    this.httpClientService.updateGateway(this.gatewayId, updateGateway).subscribe();

  }


  // on Update or case of url param has Gateway Id - get gateway/id and Set its properties
  onUpdate() {

    this.gatewayId = Number(this.route.snapshot.paramMap.get('id'));

    this.gatewayService.getGateway(this.gatewayId).subscribe(
      data => {
        this.gateway = data
        this.name = data.name;
        this.ipAddress = data.ipAddress;
      }
    )
  }

}
