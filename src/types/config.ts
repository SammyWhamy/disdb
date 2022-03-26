export interface Config {
    discord: {
        storageServer: string,
        bots: {
            master: string,
            slaves: string[],
        }
    }
}
