/* eslint-disable  */
import path from "path";
import { Env } from "./src/shared/env";
import { defineConfig, UserConfigExport } from "vitest/config";

function config(): UserConfigExport {
    const config: UserConfigExport = {
        test: {
            testTimeout: 20_000,
            exclude: ["**/dist/**", "**/node_modules/**"],
        },
        resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    };

    if (Env.exists("TEST_ENV")) {
        switch (Env.get("TEST_ENV")) {
            case "unit":
                config.test!.exclude!.push("**/*.test.ts");
                break;
            case "integration":
                config.test!.exclude!.push("**/*.spec.ts");
                break;
        }
    }

    return defineConfig(config);
}

export default config();
