import { Router } from "express";
import { pingFactory } from "../http/factories/controllers/auth/auth.factory";
import { adapterExpress } from "../http/express.adapter";

export function authRoutes(router: Router) {
    router.get(
        "/ping",
    adapterExpress(pingFactory()));
}