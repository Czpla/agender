/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDomainError } from "./errors/domain.error";
import { Either, failed, right } from "./either";
import { sleep } from "./helpers/sleep";

export type BackoffOptions = {
    numOfAttempts?: number;
    delay?: number;
};

export class Try {
    private constructor() {}

    public static func<T>(
        func: (() => T) | (() => Promise<T>)
    ): T extends Promise<any>
        ? Promise<Either<IDomainError, T>>
        : Either<IDomainError, T> {
        try {
            const result = func();

            if (result instanceof Promise) {
                return Try.promise<T>(result) as any;
            }

            return right(result) as any;
        } catch (error: any) {
            return failed(error) as any;
        }
    }

    public static async promise<T>(
        promise: Promise<T>
    ): Promise<Either<Error, T>> {
        try {
            return right(await promise);
        } catch (error: any) {
            return failed(error);
        }
    }

    public static async retry<T>(
        func: (() => T) | (() => Promise<T>),
        attempts = 10,
        delay = 1000
    ): Promise<Either<IDomainError, T>> {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            try {
                const result = func();

                if (result instanceof Promise) {
                    return right(await result);
                }

                return right(result);
            } catch (error: any) {
                if (--attempts === 0) {
                    return failed(error);
                }

                await sleep(delay);
            }
        }
    }
}