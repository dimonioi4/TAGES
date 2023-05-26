import {PetApiClient} from "../../core/api/pets-api";

export interface Pet {
    id: number,
    category: {
        name: string;
    };
    name: string;
    photoUrls: string[];
    tags: {
        id: number;
        name: string;
    }[];
    status: string;
}
