export type Either<F, R> = Failed<F, R> | Right<F, R>;

export class Failed<F, R> {
    public readonly value: F;

    constructor(value: F) {
        this.value = value;
    }

    public isFailed(): this is Failed<F, R> {
        return true;
    }

    public isRight(): this is Right<F, R> {
        return false;
    }
}

export class Right<F, R> {
    public readonly value: R;

    constructor(value: R) {
        this.value = value;
    }

    public isFailed(): this is Failed<F, R> {
        return false;
    }

    public isRight(): this is Right<F, R> {
        return true;
    }
}

export function right<F>(): Either<F, void>;
export function right<F, R>(value: R): Either<F, R>;
export function right<F, R>(value?: R) {
    return new Right<F, R | void>(value);
}

export function failed<F, R>(value: F) {
    return new Failed<F, R>(value);
}