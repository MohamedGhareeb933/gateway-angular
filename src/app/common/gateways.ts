export class Gateways {

    id? : number;
    serial? : string;
    name? : string;
    ipAddress?: string;

    constructor(name? : string , ipAddress? : string, id? : number) {
      this.name = name;
      this.ipAddress = ipAddress;
      this.id = id;
    }
}
