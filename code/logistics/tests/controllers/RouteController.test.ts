import RouteController from "../../src/application/controllers/route/RouteController";
import RouteDTO from "../../src/domain/dto/RouteDTO";
import RouteService from "../../src/domain/services/route/RouteService";
import RouteRepository from "../../src/infrastructure/repositories/route/RouteRepository";
import RouteMap from "../../src/infrastructure/mappers/RouteMap";
import { describe } from "mocha";
import assert from "assert";
import Sinon from "sinon";
import { badRequestErrorFactory, Err, persistanceErrorFactory } from "../../src/domain/utils/Err";

const body = {
  idRoute: "idroute1",
  idStart: "idstart1",
  idEnd: "idend1",
  distance: 100,
  timeRequired: 100,
  energyConsumed: 100,
  extraChargingTime: 100,
};

const update_body = {
  idStart: "idstart1",
  idEnd: "idend2",
  distance: 100,
  timeRequired: 100,
  energyConsumed: 100,
  extraChargingTime: 100,
};

const bad_body = {
    extraChargingTime: 2,
    energyConsumed: 2,
    timeRequired: 1,
    distance: 2,
    idEnd: "string",
    idStart: "string",
    idididid:"shouldfailt"
};

const dto = body as RouteDTO;
// const bad_dto = bad_body as RouteDTO;
const update_dto = update_body as RouteDTO;
const array_dto = [body as RouteDTO];

describe("Create Route", () => {
  const routePrototype: RouteService = new RouteService(new RouteRepository());

  const rlc: RouteController = new RouteController(routePrototype);

  beforeEach(function () {
    Sinon.stub(RouteService.prototype, "createRoute");
    Sinon.stub(RouteService.prototype, "getRouteById");
    Sinon.stub(RouteService.prototype, "getRoutes");
    Sinon.stub(RouteService.prototype, "updateRouteById");
  });

  afterEach(function () {
    (routePrototype.createRoute as Sinon.SinonStub).restore();
    (routePrototype.getRouteById as Sinon.SinonStub).restore();
    (routePrototype.getRoutes as Sinon.SinonStub).restore();
    (routePrototype.updateRouteById as Sinon.SinonStub).restore();
  });

  it("Successfully create Route", async () => {
    (routePrototype.createRoute as Sinon.SinonStub).callsFake(function (
      this: RouteDTO
    ) {
      return Promise.resolve(dto);
    });
    const res = await rlc.createRoute(body);
    assert.deepStrictEqual(res, RouteMap.toJSON(dto));
  });

  it("Successfully get Route by id", async () => {
    (routePrototype.getRouteById as Sinon.SinonStub).callsFake(function (
      this: RouteDTO
    ) {
      return Promise.resolve(dto);
    });
    const res = await rlc.getRouteById(body.idRoute);
    assert.deepStrictEqual(res, RouteMap.toJSON(dto));
  });

  it("Successfully get all Routes", async () => {
    (routePrototype.getRoutes as Sinon.SinonStub).callsFake(function (
      this: RouteDTO[]
    ) {
      return Promise.resolve(array_dto);
    });

    const res = await rlc.getRoutes();
    assert.deepStrictEqual(res, [body]);
  });

  it("Successfully update Route", async () => {
    (routePrototype.updateRouteById as Sinon.SinonStub).callsFake(function (
      this: RouteDTO
    ) {
      return Promise.resolve(update_dto);
    });

    const res = await rlc.updateRouteById(body.idRoute, update_body);
    assert.deepStrictEqual(res, RouteMap.toJSON(update_dto));
  });

  it("Fail to update Route", async () => {
    (routePrototype.updateRouteById as Sinon.SinonStub).callsFake(function (
      this: RouteDTO
    ) {
      return Promise.resolve(dto);
    });

    try {
      await rlc.updateRouteById(body.idRoute, bad_body);
    } catch (e) {
      //console.log((e as Err).message);
      assert.deepStrictEqual((e as Err).message, badRequestErrorFactory().message);
    }
  });
});
