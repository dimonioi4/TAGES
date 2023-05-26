import {PetApiClient} from "../core/api/pets-api";
import {test, expect} from '@playwright/test';
import {Pet} from "../utils/types/pets";
import {validateSchema} from "../utils/schema/validator";
import {petSchema} from "../utils/schema/pets-schema";

const baseUrl = 'https://petstore.swagger.io/v2';
test.describe('POST', () => {
    test('Added valid new pet', async ({ context }) => {

    // Создание экземпляра APIRequestContext из текущего контекста теста
    const apiContext = context.request;

    // Создание экземпляра API-клиента с передачей базового URL и APIRequestContext в конструктор
    const apiClient = new PetApiClient(baseUrl, apiContext);

    // Создание нового питомца для добавления
    const newPet: Pet = {
        "category": {
            "name": "doggy"
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

    test('Add Pet - Invalid Photo URL', async ({context}) => {
        const apiContext = context.request;
        const apiClient = new PetApiClient(baseUrl, apiContext);

        const newPet: Pet = {
            category: {
                name: 'Category 1',
            },
            // Неправильный формат URL для фото
            photoUrls: 1,
            tags: [],
            status: 'available'
        };
        const errorResponse = {
            code: 500,
            message: 'something bad happened',
            type: 'unknown',
        };

        await expect(apiClient.addPet(newPet)).resolves.toEqual(errorResponse);
    });
});

test.describe('GET', () => {
    test('Get pet by Id positive', async ({ context }) => {
        const apiContext = context.request;
        const apiClient = new PetApiClient(baseUrl, apiContext);
        const newPet: Pet = {
            "category": {
                "name": "doggy"
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
        // Получение питомца по id
        const pet = await apiClient.findPetsById(addedPet.id);

        const requestedPet = {
            id: 1,
            category: {
                id: 1,
                name: "string"
            },
            name: "doggie",
            photoUrls: ["string"],
            status: "available",
            tags: [
                {
                    id: 1,
                    name: "string"
                }
            ]
        };
        expect(pet).toEqual(requestedPet);

        // Пример валидации схемы
        await validateSchema({ schema: petSchema, json: pet });
    });
    test('Get pet by Id negative', async ({ context }) => {
        const apiContext = context.request;
        const apiClient = new PetApiClient(baseUrl, apiContext);

        const petId = Math.floor(100000 + Math.random() * 900000);
        // Получение питомца по id
        const invalidPet = await apiClient.findPetsById(petId);
        const bodyError =
        {
            "code": 1,
            "type": "error",
            "message": "Pet not found"
        };

        expect(invalidPet).toEqual(bodyError);
    });
});

test('Delete pet', async ({ context }) => {
    const apiContext = context.request;
    const apiClient = new PetApiClient(baseUrl, apiContext);
    const deleteId = 9223372036854773000;

    // Пример удаления питомца по идентификатору
    await apiClient.deletePet(deleteId);
    const bodyError =
        {
            "code": 1,
            "type": "error",
            "message": "Pet not found"
        };
    // Проверка успешности удаления
    const deletedPet = await apiClient.findPetsById(deleteId);
    expect(deletedPet).toEqual(bodyError);
});
