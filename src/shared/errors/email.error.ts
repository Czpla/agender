import { IDomainError } from "./domain.error";

export class InvalidFormatEmail extends Error implements IDomainError {
    constructor(email: string) {
        super(`The email format "${email}" is not a valid format`);
    }
}