import { HandleErrorMiddleware } from "@/adapters/middlewares/handle-error.middleware";

export function handleErrorFactory(error: Error) {
    return new HandleErrorMiddleware(error);
}