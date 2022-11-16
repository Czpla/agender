/* eslint-disable @typescript-eslint/no-explicit-any */
export { StatusCode } from "@/shared/constants/status-code";

import { StatusCode } from "@/shared/constants/status-code";
import { IDomainError } from "@/shared/errors/domain.error";
import { InvalidHttpInternalServerError, InvalidHttpNotFound } from "@/shared/errors/http.error";

export type HttpSetHeader = { setHeaders: Record<string, any> };
export type HttpResponseOptions = Partial<HttpSetHeader>;
export type HttpNext = (request?: Partial<HttpRequest>) => void;
export type HttpBody<Type = Record<string, any>> = { body: Type };
export type HttpParams<Type = Record<string, any>> = { params: Type };
export type HttpCustom<Type = Record<string, any>> = { custom: Type };
export type HttpQuery<Type = Record<string, any>> = { query: Type };
export type HttpHeader<Type = Record<string, any>> = { headers: Type };
export type HttpStatusCode = { statusCode: StatusCode };
export type HttpRedirect = { redirect: string };
export type HttpMetadata = {
    metadata: { ip: string; hostname: string; protocol: string };
};

export type HttpResponse = Partial<
    HttpBody &
        HttpStatusCode &
        HttpRedirect & {
            options: HttpResponseOptions;
        }
>;

export type HttpRequest = Partial<
    HttpBody &
    HttpParams &
    HttpQuery &
    HttpCustom &
    HttpHeader &
    HttpMetadata
>;

export function response(
    statusCode: StatusCode,
    body: any | Error,
    options?: HttpResponseOptions
): HttpResponse {
    if (body instanceof Error) {
        const error: IDomainError = body;

        body = {
            message: error.message,
            errors: error.errors,
        } as IDomainError;
    }

    return {
        body,
        options,
        statusCode,
    };
}

export function ok(body: any, options?: HttpResponseOptions): HttpResponse {
    return response(StatusCode.OK, body, options);
}

export function badRequest(
    body: IDomainError | Record<string, any>,
    options?: HttpResponseOptions
): HttpResponse {
    return response(StatusCode.BadRequest, body, options);
}

export function internalServerError(error: Error): HttpResponse {

    // eslint-disable-next-line no-console
    console.log(error);

    return response(
        StatusCode.InternalServerError,
        new InvalidHttpInternalServerError()
    );
}

export function notFound(
    body?: Record<string, any> | null,
    options?: HttpResponseOptions
): HttpResponse {
    return response(
        StatusCode.NotFound,
        body ?? new InvalidHttpNotFound(),
        options
    );
}