import { IDomainError } from "./domain.error";

export class FailedAuthenticate extends Error implements IDomainError {
    constructor() {
        super("Incorrect username or password");
    }
}