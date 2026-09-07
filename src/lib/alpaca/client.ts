import "server-only";

const baseUrl = process.env.ALPACA_BASE_URL;
const basicAuthKey = process.env.ALPACA_BASIC_AUTH_KEY;

if (!baseUrl) {
  throw new Error("ALPACA_BASE_URL is not configured");
}

if (!basicAuthKey) {
  throw new Error("Basic Auth Key is not configured");
}

export class AlpacaApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = "AlpacaApiError";
  }
}

export async function alpacaRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Basic ${basicAuthKey}`,
    },
    ...options,
  });

  const text = await response.text();

  let data: unknown;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  console.log(response);
  if (!response.ok) {
    throw new AlpacaApiError(
      "Alpaca API request failed",
      response.status,
      data,
    );
  }

  return data as T;
}
