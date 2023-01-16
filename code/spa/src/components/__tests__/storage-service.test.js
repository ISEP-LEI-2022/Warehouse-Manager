import { describe, it, expect, beforeEach } from 'vitest'
import StorageService from 'services/StorageService'

describe("StorageService", () => {
    let storageService;
    beforeEach(() => {
        storageService = new StorageService();
    });


    // Pagination Feauture


    it("Should return a list of storages", async () => {
        const storages = await storageService.getStorages();
        expect(storages).toBeDefined();
    });

    it('getStoragesPagination returns the correct data', async () => {
        const page = 1
        const perPage = 3
        const data = await storageService.getStoragesPagination(page, perPage)
        expect(data.storageList).toBeDefined()
        expect(data.totalRecords).toBeDefined()
    })

    // Suppress Storage Feature 

    it("Should return a specific storage by id", async () => {
        const storage = await storageService.getStorageById(1);
        expect(storage).toBeDefined();
    });
});