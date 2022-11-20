import assert from "assert";
import sinon from "sinon";
import TruckController from '../../src/application/controllers/truck/TruckController';
import TruckDTO from "../../src/domain/dto/TruckDTO";
import TruckService from "../../src/domain/services/truck/TruckService";
import TruckRepository from "../../src/infrastructure/repositories/truck/TruckRepository";
import TruckMap from "../../src/infrastructure/mappers/TruckMap";
import { persistanceErrorFactory } from "../../src/domain/utils/Err";



const body = {
    registration: "25-TP-55",
    tare: 2000,
    capacity: 5000,
    autonomy: 500,
};

const update_body = {
    registration: "25-TP-55",
    tare: 1000,
    capacity: 5000,
    autonomy: 200,
};

const bad_body = {
    registration: "25TP55",
    tare: 2000,
    capacity: 5000,
    autonomy: 500,
};

const dto = body as TruckDTO;
const bad_dto = body as TruckDTO;
const update_dto = update_body as TruckDTO;
const array_dto = [body as TruckDTO];

describe("Test Truck Controller", () => {
    const truckPrototype: TruckService = new TruckService(
        new TruckRepository());

    const clc: TruckController = new TruckController(truckPrototype);
    beforeEach(function () {
        sinon.stub(TruckService.prototype, "createTruck");
        sinon.stub(TruckService.prototype, "getTruckByRegistration");
        sinon.stub(TruckService.prototype, "getTrucks");
        sinon.stub(TruckService.prototype, "updateTruckByRegistration");
    });

    afterEach(function () {
        (truckPrototype.createTruck as sinon.SinonStub).restore();
        (truckPrototype.getTruckByRegistration as sinon.SinonStub).restore();
        (truckPrototype.getTrucks as sinon.SinonStub).restore();
        (truckPrototype.updateTruckByRegistration as sinon.SinonStub).restore();
    });

    it("Successfully create Truck", async () => {
        (truckPrototype.createTruck as sinon.SinonStub).callsFake(function (this: TruckDTO) {
            return Promise.resolve(dto);
        });

        const result = await clc.createTruck(body);
        assert.deepStrictEqual(result, TruckMap.toJSON(dto));
    });

    it("Successfully get Truck by registration", async () => {
        (truckPrototype.getTruckByRegistration as sinon.SinonStub).callsFake(function (this: TruckDTO) {
            return Promise.resolve(dto);
        });

        const result = await clc.getTruckByRegistration(body.registration);
        assert.deepStrictEqual(result, body);
    });

    it("Successfully list Trucks", async () => {
        (truckPrototype.getTrucks as sinon.SinonStub).callsFake(function (this: TruckDTO[]) {
            return Promise.resolve(array_dto);
        });

        const result = await clc.getTrucks();
        assert.deepStrictEqual(result, [body]);
    });

    it("Successfully update Truck", async () => {
        (truckPrototype.updateTruckByRegistration as sinon.SinonStub).callsFake(function (this: TruckDTO) {
            return Promise.resolve(update_dto);
        });

        const result = await clc.updateTruckByRegistration(update_body);
        assert.deepStrictEqual(result, update_body);
    });

    it("Fail update Truck", async () => {
        (truckPrototype.updateTruckByRegistration as sinon.SinonStub).callsFake(function (this: TruckDTO) {
            return Promise.resolve(dto);
        });

        try {
            await clc.updateTruckByRegistration(bad_dto);
        } catch (e) {
            assert.deepStrictEqual((e as Error).message, persistanceErrorFactory().message);
        }
    });

});