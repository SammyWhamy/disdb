export async function getDataFromJPEG(buffer: Buffer): Promise<string> {
    const hex = buffer.toString('hex').toUpperCase();
    const data = hex.substring(hex.indexOf('FFFE') + 4, hex.indexOf('FFD9'));
    const buf = Buffer.from(data, 'hex');
    return buf.toString();
}
