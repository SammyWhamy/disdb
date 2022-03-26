import {Config} from "../types/config.js";
import {discordConfig} from "../config/discordConfig.js";
import {Client} from "discord.js";
import {DMaster, DSlave} from "../types/discord.js";

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
        await this.connectMaster(this.config.bots.master);

        this.slaves = [];
        for(let i = 0; i < this.config.bots.slaves.length; i++) {
            this.slaves.push({
                available: false,
                client: new Client(discordConfig.slave)
            });
            await this.connectSlave(i, this.config.bots.slaves[i]);
        }
    }

    private async connectMaster(token: string) {
        if(!this.master)
            throw new Error("Master not initialized");

        await this.master.client.login(token);
        this.master.available = true;
        console.log("Master client connected");
    }

    private async connectSlave(index: number, token: string) {
        if(!this.slaves || !this.slaves[index])
            throw new Error("Slave not initialized");

        await this.slaves[index].client.login(token);
        this.slaves[index].available = true;
        console.log(`Slave client ${index} connected`);
    }
}
