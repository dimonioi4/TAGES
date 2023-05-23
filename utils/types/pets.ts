import {PetApiClient} from "../../core/api/pets-api";

export interface Pet {
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
