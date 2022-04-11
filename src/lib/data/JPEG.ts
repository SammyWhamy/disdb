const BASE = "FFD8FFDB004300FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC0000B080001000101011100FFC40014000100000000000000000000000000000003FFC40014100100000000000000000000000000000000FFDA0008010100003F0037FFFE";
const EOF = "FFD9";
const COM = "FFFE";
const MIME = "image/jpeg";
const ENCODING: BufferEncoding = "base64";
const INTERMEDIARY: BufferEncoding = "hex";

export function encode(value: any): string {
    const valueEncoded = Buffer.from(value).toString(INTERMEDIARY);
    const JPEG = `${BASE}${valueEncoded}${EOF}`;
    const JPEGEncoded = Buffer.from(JPEG, INTERMEDIARY).toString(ENCODING);
    return `data:${MIME};${ENCODING},${JPEGEncoded}`;
}

export async function decode(jpeg: Buffer): Promise<string> {
    const intermediary = jpeg.toString(INTERMEDIARY).toUpperCase();
    const data = intermediary.substring(intermediary.indexOf(COM) + 4, intermediary.indexOf(EOF));
    const buffer = Buffer.from(data, INTERMEDIARY);
    return buffer.toString();
}
