import AggregateRoot from "../AggregateRoot";
import {
  Distance,
  RouteIdentifier,
  WarehouseIdentifier,
  Duration,
  Energy,
} from "../../value-objects";
import { businessRuleErrorFactory } from "../../utils/Err";
import Entity from "../../Entity";

export default class Route implements AggregateRoot<string> {
  private id: RouteIdentifier;
  private idStartProp: WarehouseIdentifier;
  private idEndProp: WarehouseIdentifier;
  private distanceProp: Distance;
  private timeRequiredProp: Duration;
  private energyConsumedProp: Energy;
  private extraChargingTimeProp: Duration;

  constructor(
    id: string,
    idStart: string,
    idEnd: string,
    distance: number,
    timeRequired: number,
    energyConsumed: number,
    extraChargingTime: number
  ) {
    const error = businessRuleErrorFactory();
    try {
      this.id = new RouteIdentifier(id);
      this.idStartProp = new WarehouseIdentifier(idStart);
      this.idEndProp = new WarehouseIdentifier(idEnd);
      this.distanceProp = new Distance(distance);
      this.timeRequiredProp = new Duration(timeRequired);
      this.energyConsumedProp = new Energy(energyConsumed);
      this.extraChargingTimeProp = new Duration(extraChargingTime);
    } catch (err) {
      error.addError(err as string);
    }
    if (error.hasErrors()) throw error;
  }

  get identifier() {
    return this.id;
  }

  sameAs(ent2: Entity<string>): boolean {
    return this.id.equals(ent2.identifier);
  }

  get idStart() {
    return this.idStartProp;
  }

  get idEnd() {
    return this.idEndProp;
  }

  get distance() {
    return this.distanceProp;
  }

  get timeRequired() {
    return this.timeRequiredProp;
  }

  get energyConsumed() {
    return this.energyConsumedProp;
  }

  get extraChargingTime() {
    return this.extraChargingTimeProp;
  }
}
