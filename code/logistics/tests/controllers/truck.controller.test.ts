import TruckController from '../../src/application/controllers/truck.controller'
import * as TruckRepo from '../../src/infrastructure/repositories/truck/truck.repository'
import {generateTrucksData, generateTruckPayload, generateTruckData} from '../utils/generate'

afterEach(() => {
    jest.resetAllMocks()
})

describe("TruckController", () => {
    describe("getTrucks", () => {
        test("should return empty array", async () => {
            const spy = jest.spyOn(TruckRepo, 'getTrucks').mockResolvedValueOnce([])
            const controller = new TruckController();
            const comments = await controller.getTrucks();
            expect(comments).toEqual([])
            expect(spy).toHaveBeenCalledWith()
            expect(spy).toHaveBeenCalledTimes(1)
        })

    test("should return trucks list", async () => {
        const commentsData = generateTrucksData(2)
        const spy = jest.spyOn(TruckRepo, 'getTrucks').mockResolvedValueOnce(commentsData)
        const controller = new TruckController();
        const comments = await controller.getTrucks();
        expect(comments).toEqual(commentsData)
        expect(spy).toHaveBeenCalledWith()
        expect(spy).toHaveBeenCalledTimes(1)
    })
})

describe("createTruck", () => {
    test("should add truck to the database", async () => {
        const payload = generateTruckPayload()
        const commentData = generateTruckData(payload)
        const spy = jest.spyOn(TruckRepo, 'createTruck').mockResolvedValueOnce(commentData)
        const controller = new TruckController();
        const comment = await controller.createTruck(payload);
        expect(comment).toMatchObject(payload)
        expect(comment).toEqual(commentData)
        expect(spy).toHaveBeenCalledWith(payload)
        expect(spy).toHaveBeenCalledTimes(1)
    })
})

describe("getTruck", () => {
    test("should return truck from the database", async () => {
        const registration = '487-YNB'
        const truckData = generateTruckData({registration})
        const spy = jest.spyOn(TruckRepo, 'getTruck').mockResolvedValueOnce(truckData)
        const controller = new TruckController();
        const truck = await controller.getTruck(registration);
        expect(truck).toEqual(truckData)
        expect(truck?.registration).toBe(registration)
        expect(spy).toHaveBeenCalledWith(registration)
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return null if truck not found", async () => {
        const registration = 'WZT-241'
        const spy = jest.spyOn(TruckRepo, 'getTruck').mockResolvedValueOnce(null)
        const controller = new TruckController();
        const comment = await controller.getTruck(registration);
        expect(comment).toBeNull()
        expect(spy).toHaveBeenCalledWith(registration)
        expect(spy).toHaveBeenCalledTimes(1)
    })
})
})