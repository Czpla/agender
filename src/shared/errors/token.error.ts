import { IDomainError } from "./domain.error";

export class InvalidCredentials extends Error implements IDomainError {
    constructor() {
        super("Invalid credentials");
    }
}

export class InvalidToken extends Error implements IDomainError {
    constructor(message = "Invalid token") {
        super(message);
    }
}

export class InvalidExpiredToken extends InvalidToken {
    constructor(expiredAt: Date) {
        super(`Token expired at ${expiredAt}`);
    }
}

export class InvalidNotBefore extends InvalidToken {
    constructor(date: Date) {
        super(`The token entered is not valid before ${date}.`);
    }
}