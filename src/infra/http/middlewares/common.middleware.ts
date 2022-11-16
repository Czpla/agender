/* eslint-disable @typescript-eslint/no-var-requires */
import cors from "cors";
import helmet from "helmet";
import { Config } from "@/config/config";
import express, { Application } from "express";

export function commonMiddlewares(app: Application) {
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable("trust proxy");

    app.set("Json spaces", 4);

    app.use(cors());
    app.use(helmet());

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: false }));
    app.use("/static", express.static(`${process.cwd()}/public`));

    if (Config.dev) {
        app.use((req, res, next) => {
            const start = Date.now();

            res.addListener("finish", () => {
                const path = req.path;
                const method = req.method;
                const status = res.statusCode;
                const time = Date.now() - start;
                const bytes = res.get("Content-Length") || 0;

                // eslint-disable-next-line no-console
                console.log(`${method} ${path} ${status} ${time}ms ${bytes}b`);
            });

            next();
        });
    }
}
