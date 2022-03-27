import { Client } from "discord.js";

export interface DClient {
    available: boolean,
    client: Client,
}

export interface DSlave extends DClient {

}

export interface DMaster extends DClient {

}
