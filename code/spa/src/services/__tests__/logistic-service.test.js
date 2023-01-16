import { describe, it, expect, beforeEach } from 'vitest'
import LogisticsService from 'services/LogisticsService'

describe("LogisticService", () => {

    it('getRoutesPagination returns the correct data', async () => {
        const page = 1
        const perPage = 3
        const data = await LogisticsService.getRoutesPagination(page, perPage)
        expect(data.routesList).toBeDefined()
        expect(data.totalRecords).toBeDefined()
    })
  
    it('getRoutesPagination returns an error when the request fails', async () => {
        const page = 1
        const perPage = 10
        const errors = []
        const getErrors = (err) => errors.push(err)
        const data = await LogisticsService.getRoutesPagination(page, perPage, getErrors)
        expect(errors.length).toBeGreaterThan(0)
    })

    it('getTripsPagination returns the correct data', async () => {
        const page = 1
        const perPage = 3
        const registration = 'CC-11-BV'
        const date = new Date('2023-01-14')
        const data = await LogisticsService.getTripsPagination(registration,date,page, perPage)
        expect(data.tripsList).toBeDefined()
        expect(data.totalRecords).toBeDefined()
    })
  
    it('getTripsPagination returns an error when the request fails', async () => {
        const page = 1
        const perPage = 10
        const errors = []
        const registration = 'CC-11-BV'
        const date = new Date('2023-01-14')
        const getErrors = (err) => errors.push(err)
        const data = await LogisticsService.getTripsPagination(registration,date,page, perPage, getErrors)
        expect(errors.length).toBeGreaterThan(0)
    })
})
