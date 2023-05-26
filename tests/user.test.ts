import {expect, test} from "@playwright/test";
import {UserApiClient} from "../core/api/users-api";
import {User} from "../utils/types/users";

const baseUrl = 'https://petstore.swagger.io/v2';
test.describe('POST, GET valid', () => {
    test('Added valid new user and Get user by user name', async ({ context }) => {

        // Создание экземпляра APIRequestContext из текущего контекста теста
        const apiContext = context.request;

        // Создание экземпляра API-клиента с передачей базового URL и APIRequestContext в конструктор
        const apiClient = new UserApiClient(baseUrl, apiContext);

        // Создание нового юзера для добавления
        const newUser: User = {
            "username": "User",
            "firstName": "User",
            "lastName": "Userov",
            "email": "mail@mail.com",
            "password": "1234",
            "phone": "88007008060",
            "userStatus": 1
        };

        // Добавление нового юзера с использованием клиента
        const addedUser: User = await apiClient.addUser(newUser);
        // Проверка добавленного юзера
        const searchUser: User = await apiClient.findUser(addedUser.username);
        expect(searchUser.username).toBe(addedUser.username);
    });
})
test.describe('DELETE', () => {
    test('Deleted user', async ({ context }) => {

        // Создание экземпляра APIRequestContext из текущего контекста теста
        const apiContext = context.request;

        // Создание экземпляра API-клиента с передачей базового URL и APIRequestContext в конструктор
        const apiClient = new UserApiClient(baseUrl, apiContext);
        const newUser: User = {
            "username": "User",
            "firstName": "User",
            "lastName": "Userov",
            "email": "mail@mail.com",
            "password": "1234",
            "phone": "88007008060",
            "userStatus": 1
        };
        const addedUser: User = await apiClient.addUser(newUser);
        // Удаление юзера
        const deletedUser = await apiClient.deleteUser(newUser.username);
        const deletedUserStatus =
            {
                "code": 200,
                "type": "unknown",
                "message": "User"
            };
        expect(deletedUser).toEqual(deletedUserStatus);
    });
});