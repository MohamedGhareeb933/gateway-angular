import { Devices } from "./devices";
import { Gateways } from "./gateways";

// Data Transfer Object - for post Methods 
export class Dto {

  constructor(public gateways? : Gateways, public devices? : Array<Devices>) {}
}
