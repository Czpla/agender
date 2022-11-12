import express  from "express";
import { Config } from "@/config/config";
import { HttpServer } from "@/infra/http/server";
import { AddressInfo } from "net";

async function main() {
    Config.loading();

    const httpServer = new HttpServer(express()).build();

    const server = httpServer.application.listen(Config.port, () => {
        const address = server.address() as AddressInfo;
        const host = address.address === "::" ? "127.0.0.1" : address.address;
        const port = address.port;

        const mode = Config.prod ? "Production" : "Debug";

        // eslint-disable-next-line no-console
        console.debug(
            `> Started server in mode "${mode}", running at http://${host}:${port}`
        );
    });
}

main();
