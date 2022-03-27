export interface Config {
    logLevel: "DEBUG" | "INFO" | "WARN" | "ERROR",
    discord: {
        prefix: string,
        storageServer: string,
        bots: {
            master: string,
            slaves: string[],
        }
    }
}
