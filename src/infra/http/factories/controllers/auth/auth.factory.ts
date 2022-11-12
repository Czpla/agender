import { PingController } from "@/adapters/controllers/auth/auth.controller";

export function pingFactory() {
    return new PingController();
}