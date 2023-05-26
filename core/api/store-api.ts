import { APIRequestContext, APIResponse } from '@playwright/test';
import { Store } from "../../utils/types/store";

export class StoreApiClient {
    baseUrl: string;
    context: APIRequestContext;

    constructor(baseUrl: string, context: APIRequestContext) {
        this.baseUrl = baseUrl;
        this.context = context;
    }

    async addStore(store: Store): Promise<Store> {
        const url = `${this.baseUrl}/store/order`;
        const response: APIResponse = await this.context.post(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: store,
        });
        const addedStore: Store = await response.json();
        return addedStore;
    }
    async findStore(id: number): Promise<Store> {
        const url = `${this.baseUrl}/store/order/${id}`;
        const response: APIResponse = await this.context.get(url);
        const store: Store = await response.json();
        return store;
    }
}
