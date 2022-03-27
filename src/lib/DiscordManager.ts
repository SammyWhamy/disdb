import {Config} from "../types/config.js";
import {discordConfig} from "../config/discordConfig.js";
import {Client} from "discord.js";
import {masterMessageHandler} from "./handlers/masterMessageHandler.js";
import {defaultLogger as console} from "../utils/Logger.js";
import {DMaster, DSlave} from "../types/discord.js";
import { set } from "./data/keyvalue/set.js";
import { get } from "./data/keyvalue/get.js";
import { exists } from "./data/keyvalue/exists.js";

export class DiscordManager {
    private readonly config: Config["discord"];
    private master: DMaster | undefined;
    private slaves: DSlave[] | undefined;

    constructor(config: Config["discord"]) {
        this.config = config;
    }

    public async connect() {
        this.master = {
            available: false,
            client: new Client(discordConfig.master)
        };
        console.debug("Connecting master client...");
        await this.connectMaster(this.config.bots.master);

        this.slaves = [];
        for(let i = 0; i < this.config.bots.slaves.length; i++) {
            this.slaves.push({
                available: false,
                client: new Client(discordConfig.slave)
            });
            console.debug(`Connecting slave client ${i}...`);
            await this.connectSlave(i, this.config.bots.slaves[i]);
        }

        this.startListeners();
    }

    private async connectMaster(token: string) {
        if(!this.master)
            throw new Error("Master not initialized");

        await this.master.client.login(token);
        this.master.available = true;
        console.info("Master client connected");
    }

    private startListeners() {
        if(!this.master)
            throw new Error("Master not initialized");

        let prefix = this.config.prefix;
        console.debug(`Using prefix ${prefix}`);
        this.master.client.on("messageCreate", m => masterMessageHandler(m, prefix));

        console.debug("Listeners started");
    }

    private async connectSlave(index: number, token: string) {
        if(!this.slaves || !this.slaves[index])
            throw new Error("Slave not initialized");

        await this.slaves[index].client.login(token);
        this.slaves[index].available = true;
        console.info(`Slave client ${index} connected`);
    }

    private getRandomSlave(): DSlave {
        if(!this.slaves)
            throw new Error("Slaves not initialized");

        let index = Math.floor(Math.random() * this.slaves.length);
        return this.slaves[index];
    }

    public async set(key: string, value: string) {
        if(!this.master)
            throw new Error("Master not initialized");

        await set(this.master.client, this.getRandomSlave().client, this.config.storageServer, key, value);
    }

    public async get(key: string): Promise<string | undefined> {
        if(!this.master)
            throw new Error("Master not initialized");

        return await get(this.getRandomSlave().client, this.config.storageServer, key);
    }

    public async exists(key: string): Promise<boolean> {
        if(!this.master)
            throw new Error("Master not initialized");

        return await exists(this.getRandomSlave().client, this.config.storageServer, key);
    }
}
