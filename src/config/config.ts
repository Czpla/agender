import dotenv from "dotenv";
import { Env } from "@/shared/env";

export class Config {
    public static get port() {
        return Env.get("PORT", 3000);
    }

    public static get prod() {
        return Env.get("NODE_ENV") === "production";
    }

    public static get dev() {
        return !Env.exists("NODE_ENV") || Env.get("NODE_ENV") === "development";
    }

    public static loading() {
        dotenv.config({ path: ".env" });
    }
}