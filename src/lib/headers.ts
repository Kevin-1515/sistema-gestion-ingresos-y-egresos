import type { NextApiRequest } from "next";

export function toFetchHeaders(nodeHeaders: NextApiRequest["headers"]): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      value.forEach(v => headers.append(key, v));
    } else if (value !== undefined) {
      headers.append(key, value);
    }
  }
  return headers;
}