import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gateways } from 'src/app/common/gateways';
import { DeviceService } from 'src/app/services/device.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Devices } from "../../common/devices";
import { Dto } from "../../common/dto";


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  // Vendor and status for sync with Template Driven form
  vendor? : string;
  status?: boolean = false;

  // gateway and Device id for Routing
  gatewayId: number = 0;
  deviceId: number = 0;

  // check if the routing has Device Id to decide to add or update
  hasDeviceId: boolean = false;
  clicked: boolean = false;

  device: Devices = new Devices();

  constructor(private route: ActivatedRoute, private httpClientService: HttpClientService,
    private deviceService: DeviceService) { }

    // get gateway id and check for device id from url param
    // if the url param has device Id - make Updates
  ngOnInit(): void {
    this.gatewayId = Number(this.route.snapshot.paramMap.get('id'));

    this.hasDeviceId = this.route.snapshot.paramMap.has('deviceId');

    if(this.hasDeviceId) {
      this.onUpdate();
    }

  }

  /** if the Url Param has Device ID update otherwise add  */
  addOrUpdate() {
    if (this.hasDeviceId) {
      this.update();
    } else {
      this.add();
    }

  }


  /** initialise Device - initialise device properties and Post Data transfer Object  */
  add() {
    let gateway: Gateways = new Gateways();
    gateway.id = this.gatewayId;

    let device: Devices = new Devices(this.vendor, this.status, gateway);

    let devicesSet: Array<Devices> = new Array();
    devicesSet.push(device);

    let dto: Dto = new Dto();
    dto.devices = devicesSet;

    this.httpClientService.addBody(dto).subscribe();

  }


  /**  update Entity properties subscribe to put http method */
  update() {

    let updateDevice: Devices = this.device;

    updateDevice.vendor = this.vendor;
    updateDevice.status = this.status;

    this.httpClientService.updateDevice(this.deviceId, updateDevice).subscribe();

  }

  /**  get the device id from url param and subscribe or sepecifc device of identified Id */
  onUpdate() {

    this.deviceId = Number(this.route.snapshot.paramMap.get('deviceId'));

    this.deviceService.getDevice(this.deviceId).subscribe(
      data => {
        this.device = data
        this.vendor = data.vendor;
        this.status = data.status;

        console.log(data)
      }
    )
  }


  /**  on Change - bind the status to the Checkbox vlaue */
  onChange(event : boolean) {
    console.log(this.status);
    this.status = event;
  }

}
