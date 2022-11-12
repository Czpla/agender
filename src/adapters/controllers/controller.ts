/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest, HttpResponse } from "../http";

export type JsonObject = { [Key in string]?: JsonValue };
export type JsonArray = JsonValue[];
export type JsonPrimitive = string | number | boolean | null | Date;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export interface IController {
    handle(request: HttpRequest): HttpResponse | Promise<HttpResponse>;
}