import { HttpNext, HttpRequest, HttpResponse } from "./../http";

export interface IMiddleware {
    handle(
        request: HttpRequest,
        next: HttpNext
    ): HttpResponse | void | Promise<HttpResponse | void>;
}