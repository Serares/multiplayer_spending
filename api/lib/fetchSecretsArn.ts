export async function fetchSecretArn(name?: string) {
  return process.env.POSTGRES_SECRET_ARN ? process.env.POSTGRES_SECRET_ARN : '';
}
