import {PetApiClient} from "../core/api/pets-api";
import {test, expect, request} from '@playwright/test';
import {Pet} from "../utils/types/pets";

test('Swagger Petstore API Test', async ({ context }) => {
    const baseUrl = 'https://petstore.swagger.io/v2';

    // Создание экземпляра APIRequestContext из текущего контекста теста
    const apiContext = context.request;

    // Создание экземпляра API-клиента с передачей базового URL и APIRequestContext в конструктор
    const apiClient = new PetApiClient(baseUrl, apiContext);

    // Создание нового питомца для добавления
    const newPet: Pet = {
        "category": {
            "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
            "string"
        ],
        "tags": [
            {
                "id": 0,
                "name": "string"
            }
        ],
        "status": "available"
    };

    // Добавление нового питомца с использованием клиента
    const addedPet: Pet = await apiClient.addPet(newPet);

    // Проверка добавленного питомца
    expect(addedPet.name).toBe(newPet.name);
    expect(addedPet.status).toBe(newPet.status);
});