import {Config} from "../types/config.js";
import {DiscordManager} from "./DiscordManager.js";

export class StorageClient {
    private config: Config;
    public discordManager: DiscordManager | undefined;

    constructor(config: Config) {
        this.config = config;
    }

    public async connect(): Promise<void> {
        this.discordManager = new DiscordManager(this.config.discord);
        await this.discordManager.connect();
        console.log("Discord manager initialized");
    }
}
