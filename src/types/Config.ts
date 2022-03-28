export interface Config {
    logLevel: "DEBUG" | "INFO" | "WARN" | "ERROR",
    discord: {
        storageServer: string,
        bots: {
            master: string,
            slaves: string[],
        }
    }
}
