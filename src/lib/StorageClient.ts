import {Config} from "../types/config.js";
import {DiscordManager} from "./DiscordManager.js";
import {defaultLogger as console} from "../utils/Logger.js";

export class StorageClient {
    private config: Config;
    public discordManager: DiscordManager | undefined;

    constructor(config: Config) {
        if(!config)
            throw new Error("Config is not defined");

        if(!config.discord)
            throw new Error("Discord config is not defined");

        if(!config.discord.storageServer)
            throw new Error("Storage server is not defined");

        if(!config.discord.bots.master)
            throw new Error("Discord master is not defined");

        if(!config.discord.bots.slaves || config.discord.bots.slaves.length === 0)
            throw new Error("Discord slaves are not defined");

        if(!config.discord.prefix)
            console.warn("No prefix was specified, you will not be able to run commands.");

        this.config = config;
    }

    public async connect(): Promise<void> {
        this.discordManager = new DiscordManager(this.config.discord);
        await this.discordManager.connect();
        console.log("Discord manager initialized");
    }
}
