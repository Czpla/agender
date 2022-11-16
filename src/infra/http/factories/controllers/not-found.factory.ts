import { NotFoundController } from "@/adapters/controllers/not-found.controller";

export function notFoundFactory() {
    return new NotFoundController();
}