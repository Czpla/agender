import { IDomainError } from "./domain.error";

export class InvalidNonNullable extends Error implements IDomainError {
    constructor(key: string) {
        super(`the "${key}" value cannot be null`);
    }
}

export class InvalidMinLength extends Error implements IDomainError {
    constructor(key: string, length: number) {
        super(`the "${key}" value must be at least ${length} characters long`);
    }
}