import { Gateways } from "./gateways";

export class Devices {

  id?: number;
  date?: Date;

  vendor?: string;
  status?: boolean;
  gateways?: Gateways;

  constructor(vendor?: string, status?: boolean, gateways?: Gateways) {
    this.vendor = vendor;
    this.status = status;
    this.gateways = gateways;
  }
}
