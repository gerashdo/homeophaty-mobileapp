import { Medicine } from "./medicine";

export interface HighOrderComponent {
    children: JSX.Element | JSX.Element[];
}

export interface SearchResponse {
    ok:     boolean;
    total:  number;
    result: Medicine[];
}

export type ResultSearchTypes = 
    | Medicine[]

export enum AllowedCollections {
    MEDICINES = 'medicines',
}
