export function objectToBase64Converter(object: any) {
  const jsonString = JSON.stringify(object);

  const base64String = Buffer.from(jsonString, 'utf-8').toString('base64');

  return base64String;
}

export function base64ToObjectConverter(base64String: string) {
  const jsonString = Buffer.from(base64String, 'base64').toString('utf-8');

  const object = JSON.parse(jsonString);

  return object;
}
