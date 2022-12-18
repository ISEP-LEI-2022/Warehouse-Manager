import { WarehouseIdentifier } from "../../value-objects";

export default class SliceRoute {
    private idStartProp: WarehouseIdentifier;
    private idEndProp: WarehouseIdentifier;

    constructor(idStart: string, idEnd: string) {
        this.idStartProp = new WarehouseIdentifier(idStart);
        this.idEndProp = new WarehouseIdentifier(idEnd);
    }

    get idStart() {
        return this.idStartProp;
    }

    get idEnd() {
        return this.idEndProp;
    }

}