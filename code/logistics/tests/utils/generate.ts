import faker from 'faker'


export function generateTruckData(overide = {}) {
    return {
        registration: faker.random.license_plate(),
        tare: faker.random.number(),
        capacity: faker.random.number(),
        autonomy: faker.random.number(),
        ...overide
    }
}

export function generateTrucksData(n: number = 1, overide = {}) {
    return Array.from({
        length: n
        }, (_, i) => {
        return generateTruckData(overide)
    });
}

export function generateTruckPayload() {
    return {
        registration: faker.random.license_plate(),
        tare: faker.random.number(),
        capacity: faker.random.number(),
        autonomy: faker.random.number(),
    }
}