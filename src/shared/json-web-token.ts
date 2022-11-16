/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDomainError } from "./errors/domain.error";
import {
    InvalidExpiredToken,
    InvalidNotBefore,
    InvalidToken,
} from "./errors/token.error";
import { Env } from "./env";
import {
    verify,
    sign,
    decode,
    SignOptions,
    DecodeOptions,
    VerifyOptions,
    TokenExpiredError,
    NotBeforeError,
} from "jsonwebtoken";
import { Either, failed, right } from "./either";
import { Try } from "./try";

export type JwtOptions = { secret?: string };
export type JwtDecodeOptions = DecodeOptions;
export type JwtEncodeOPtions = JwtOptions & SignOptions;
export type JwtVerifyOptions = JwtOptions & VerifyOptions;

export class JsonWebToken {
    private constructor() {}

    public static enconde(
        payload: Record<string, any>,
        options?: JwtEncodeOPtions
    ): string {
        const secret = options?.secret ?? Env.get("JSON_WEB_TOKEN_SECRET_KEY");

        delete options?.secret;

        return sign(payload, secret, options);
    }

    public static decode<Type = Record<string, any>>(
        token: string,
        options?: JwtDecodeOptions
    ): Type | null {
        const decodeOrError = Try.func(() => decode(token, options));

        if (decodeOrError.isFailed()) {
            return null;
        }

        return decodeOrError.value as Type;
    }

    public static refresh(token: string, options?: SignOptions): string {
        const payload = this.decode(token);

        if (payload !== null) {
            delete payload.iat;
            delete payload.exp;
        }

        return this.enconde(payload ?? {}, options);
    }

    public static verify<T = Record<string, any>>(
        token: string,
        options?: JwtVerifyOptions
    ): Either<IDomainError, T> {
        const secret = options?.secret ?? Env.get("JSON_WEB_TOKEN_SECRET_KEY");

        delete options?.secret;

        const payloadOrError = Try.func(() => verify(token, secret, options));
        if (payloadOrError.value instanceof TokenExpiredError) {
            return failed(
                new InvalidExpiredToken(payloadOrError.value.expiredAt)
            );
        }

        if (payloadOrError.value instanceof NotBeforeError) {
            return failed(new InvalidNotBefore(payloadOrError.value.date));
        }

        if (payloadOrError.isFailed()) {
            return failed(new InvalidToken());
        }

        return right(payloadOrError.value as T);
    }
}

export const Jwt = JsonWebToken;
