export const encodeCursor = (data: { [key: string]: any }): string =>
  Buffer.from(JSON.stringify(data)).toString('base64');

export const decodeCursor = (cursor: string): { [key: string]: any } =>
  JSON.parse(Buffer.from(cursor, 'base64').toString('utf-8'));
