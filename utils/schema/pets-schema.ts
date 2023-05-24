import { JSONSchemaType } from 'ajv';
import { Pet } from "../types/pets";

export const petSchema: JSONSchemaType<Pet> = {
    type: 'object',
    properties: {
        // id: {
        // },
        category: {
            type: 'object',
            properties: {
                id: {
                    type: 'number'
                },
                name: {
                    type: 'string'
                }
            },
            required: [
                'id',
                'name'
            ]
        },
        name: {
            type: 'string'
        },
        photoUrls: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        tags: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number'
                    },
                    name: {
                        type: 'string'
                    }
                },
                required: [
                    'name'
                ]
            }
        },
        status: {
            type: 'string'
        }
    },
    required: [
        'id',
        'category',
        'name',
        'photoUrls',
        'tags',
        'status'
    ]
};
