import { APIRequestContext, APIResponse } from '@playwright/test';
import { Pet } from "../../utils/types/pets";

export class PetApiClient {
    baseUrl: string;
    context: APIRequestContext;

    constructor(baseUrl: string, context: APIRequestContext) {
        this.baseUrl = baseUrl;
        this.context = context;
    }

    async addPet(pet: Pet): Promise<Pet> {
        const url = `${this.baseUrl}/pet`;
        const response: APIResponse = await this.context.post(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: pet,
        });
        const addedPet: Pet = await response.json();
        return addedPet;
    }
}
