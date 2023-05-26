import { APIRequestContext, APIResponse } from '@playwright/test';
import { User } from "../../utils/types/users";

export class UserApiClient {
    baseUrl: string;
    context: APIRequestContext;

    constructor(baseUrl: string, context: APIRequestContext) {
        this.baseUrl = baseUrl;
        this.context = context;
    }

    async addUser(user: User): Promise<User> {
        const url = `${this.baseUrl}/user`;
        const response: APIResponse = await this.context.post(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: user,
        });
        const addedUser: User = await response.json();
        return addedUser;
    }

    async findUser(username: string): Promise<User> {
        const url = `${this.baseUrl}/user/${username}`;
        const response: APIResponse = await this.context.get(url, {
            params: {
                username: username
            }
        });
        const user: User = await response.json();
        return user;
    }
    async deleteUser(username: string): Promise<User> {
        const url = `${this.baseUrl}/user`;
        const response: APIResponse = await this.context.delete(url, {
            params: {
                username: username
            }
        });
        const deleteUser: User = await response.json();
        return deleteUser;
    }
}




