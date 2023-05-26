import {expect, test} from "@playwright/test";
import {StoreApiClient} from "../core/api/store-api";
import {Store} from "../utils/types/store";

const baseUrl = 'https://petstore.swagger.io/v2';
test.describe('POST, GET valid', () => {
    test('Added valid new store and Get store by order id', async ({context}) => {

        // Создание экземпляра APIRequestContext из текущего контекста теста
        const apiContext = context.request;

        // Создание экземпляра API-клиента с передачей базового URL и APIRequestContext в конструктор
        const apiClient = new StoreApiClient(baseUrl, apiContext);

        // Создание нового заказа
        const newStore: Store = {
            "id": 1,
            "petId": 1,
            "quantity": 0,
            "status": "placed",
            "complete": true
        };

        // Добавление нового заказа
        const addedStore: Store = await apiClient.addStore(newStore);

        // Проверка добавленного заказа
        const searchStore: Store = await apiClient.findStore(addedStore.id);
        expect(addedStore.id).toBe(searchStore.id);
    });
});
