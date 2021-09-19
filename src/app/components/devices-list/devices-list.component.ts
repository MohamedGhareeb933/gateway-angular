import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Devices } from 'src/app/common/devices';
import { DeviceService } from 'src/app/services/device.service';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  // Devices container
  devices : Devices[] = [];
  gatewayId : number = 0;
  clicked :boolean = false;

  constructor(private deviceService : DeviceService, private route : ActivatedRoute,
              private httpClientService: HttpClientService) { }

  // subscripe to url and call get device service
  ngOnInit(): void {
    this.route.paramMap.subscribe( () =>
    this.getDeviceService()
    )
  }

  // get list of devices to the gateway
  getDeviceService() {

    this.gatewayId = Number(this.route.snapshot.paramMap.get('id'));

    this.deviceService.getDevicesList(this.gatewayId).subscribe(
      indexedDB => this.devices = indexedDB
    )
  }

  // delete device - refresh after click , delay for 100 mili sec for properiate update
  // the set time out will not implemented for another service so you'll have to manully refresh
  // becouse we don't want to be to fancy here and not implement best ui ux experiance
  // we just want simple http methods for its best practices not best ui/ux in this project example
  deleteDevice(id : number | undefined) {

    const URL = `http://localhost:8080/api/devices/${id}`;

    this.httpClientService.deleteAttr(URL).subscribe();

    setTimeout( () => window.location.reload() , 100);
  }

}
