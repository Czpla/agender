import { IDomainError } from "./domain.error";

export class InvalidHttpInternalServerError
    extends Error
    implements IDomainError
{
    constructor() {
        super("Internal server error");
    }
}

export class InvalidHttpNotFound extends Error implements IDomainError {
    constructor() {
        super("No resource was found at the specified URI.");
    }
}