export default class ChargingSystems {
    ChargingTime: string;
    Storage? : string

    constructor(ChargingTime: string, storage?: string) {
        this.ChargingTime = ChargingTime;
        this.Storage = storage
    }
}
  