import {request} from 'undici';
import BodyReadable from "undici/types/readable.js";
import {DataEvent} from "../../types/DataEvent.js";

export async function getImageFromEvent(event: DataEvent): Promise<Buffer | null> {
    const route = `https://cdn.discordapp.com/guild-events/${event.id}/${event.dataHash}`;

    let {statusCode, body} = await request(route);

    if (statusCode !== 200)
        return null;

    const chunks: Buffer[] = [];
    for await(const data of body as BodyReadable) chunks.push(Buffer.from(data));
    return Buffer.concat(chunks);
}
