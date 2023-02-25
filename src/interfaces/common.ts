import { User } from "./auth";
import { Medicine } from "./medicine";

export interface HighOrderComponent {
    children: JSX.Element | JSX.Element[];
}

export interface ResultSearchAllowedTypes {
    medicines: Medicine[],
    // users: User[],
}
export interface SearchResponse<T extends keyof ResultSearchAllowedTypes> {
    ok:     boolean;
    total:  number;
    result: ResultSearchAllowedTypes[T];
}

