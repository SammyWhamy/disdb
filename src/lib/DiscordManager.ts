import {Config} from "../types/Config.js";
import {discordConfig} from "../config/discordConfig.js";
import {Client} from "discord.js";
import {messageHandler} from "./handlers/messageHandler.js";
import {defaultLogger as console} from "../utils/Logger.js";
import {DMaster, DSlave} from "../types/DiscordClients.js";
import { set } from "./data/keyvalue/set.js";
import { get } from "./data/keyvalue/get.js";
import { exists } from "./data/keyvalue/exists.js";
import {del} from "./data/keyvalue/delete.js";
import {GlobalIndex} from "../types/GlobalIndex.js";
import {getGlobalIndex} from "./data/getGlobalIndex.js";
import {messageUpdateHandler} from "./handlers/messageUpdateHandler.js";

export class DiscordManager {
    private readonly config: Config["discord"];
    protected master: DMaster | undefined;
    protected slaves: DSlave[] | undefined;
    protected guildId: string;
    protected globalIndex: GlobalIndex | undefined;
    protected getGlobalIndex = getGlobalIndex;

    public set = set;
    public get = get;
    public del = del;
    public exists = exists;

    constructor(config: Config["discord"]) {
        this.config = config;
        this.guildId = config.storageServer;
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
        this.globalIndex = await this.getGlobalIndex();
    }

    private async connectMaster(token: string) {
        if(!this.master)
            throw new Error("Master not initialized");

        const readyPromise = new Promise<void>((resolve, reject) => {
            this.master!.client.once("ready", () => {
                this.master!.available = true;
                console.info("Master client ready");
                resolve();
            });

            setTimeout(() => {
                reject("Master client connection timed out");
            }, 10000);
        });

        await this.master.client.login(token);

        await readyPromise;
    }

    private startListeners() {
        if(!this.master)
            throw new Error("Master not initialized");

        let prefix = this.config.prefix;
        console.debug(`Using prefix ${prefix}`);
        this.master.client.on("messageCreate", m => messageHandler(m, prefix));

        const boundMessageUpdateHandler = messageUpdateHandler.bind(this);
        this.master.client.on("messageUpdate", (_, m) => boundMessageUpdateHandler(m));

        console.debug("Listeners started");
    }

    private async connectSlave(index: number, token: string) {
        if(!this.slaves || !this.slaves[index])
            throw new Error("Slave not initialized");

        const readyPromise = new Promise<void>((resolve, reject) => {
            this.slaves![index].client.once("ready", () => {
                this.slaves![index].available = true;
                console.info(`Slave client ${index} ready`);
                resolve();
            });

            setTimeout(() => {
                reject(`Slave client ${index} connection timed out`);
            }, 10000);
        });

        await this.slaves[index].client.login(token);

        await readyPromise;
    }

    protected getRandomSlave(): DSlave {
        if(!this.slaves)
            throw new Error("Slaves not initialized");

        let index = Math.floor(Math.random() * this.slaves.length);
        return this.slaves[index];
    }

    public getSlaveById(id: string): DSlave | undefined {
        return this.slaves?.find(s => s.client.user?.id === id);
    }
}
