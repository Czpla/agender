import { Router } from "express";
import { adapterExpress } from "../http/express.adapter";
import { SignInFactory } from "../http/factories/controllers/auth/sign-in.factory";

export function authRoutes(router: Router) {
    router.post(
        "/auth/sign-in",
    adapterExpress(SignInFactory()));
}