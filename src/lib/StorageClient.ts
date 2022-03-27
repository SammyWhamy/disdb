import {Config} from "../types/Config.js";
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
        console.debug("Initializing Discord manager");
        await this.discordManager.connect();
        console.info("Discord manager initialized");
    }

    public async set(key: string, value: string): Promise<void> {
        if(!this.discordManager)
            throw new Error("Discord manager is not initialized");

        await this.discordManager.set(key, value);
    }

    public async get(key: string): Promise<string | null> {
        if(!this.discordManager)
            throw new Error("Discord manager is not initialized");

        return this.discordManager.get(key);
    }

    public async exists(key: string): Promise<boolean> {
        if(!this.discordManager)
            throw new Error("Discord manager is not initialized");

        return await this.discordManager.exists(key);
    }

    public async delete(key: string): Promise<void> {
        if(!this.discordManager)
            throw new Error("Discord manager is not initialized");

        await this.discordManager.delete(key);
    }
}
