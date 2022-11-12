/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IController } from "@/adapters/controllers/controller";
import { HttpRequest } from "@/adapters/http";
import { IMiddleware } from "@/adapters/middlewares/middleware";
import { merge } from "@/shared/helpers/merge";
import { Handler, Response } from "express";

export function adapterExpress(handler: IController | IMiddleware): Handler {
    return async (req: any, res, next) => {
        const request: HttpRequest = {
            metadata: {
                ip: req.ip,
                hostname: req.hostname,
                protocol: req.protocol,
            },
            body: req.body,
            params: req.params,
            headers: req.headers,
            query: req.query,
            custom: req.custom ?? {},
        };

        try {
            const response = await handler.handle(request, (clone) => {
                merge(req, clone);
                next();
            });

            if (!response) {
                return;
            }

            if ("redirect" in response) {
                return res.redirect(response.redirect!);
            }

            if (response.options?.setHeaders) {
                setHeaders(res, response.options.setHeaders);
            }

            return res.status(response.statusCode!).json(response.body);
        } catch (error) {
            return next(error);
        }
    };

    function setHeaders(res: Response, headers: Record<string, any>) {
        const entries = Object.entries(headers);

        for (const [key, value] of entries) {
            res.setHeader(key, value);
        }
    }
}
