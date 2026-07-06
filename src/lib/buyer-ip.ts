const FIRST_FORWARDED_FOR_VALUE_INDEX = 0;

export function getBuyerIp(headers: Headers): string {
  const forwardedForValues = headers.get("x-forwarded-for")?.split(",");
  const buyerIp = forwardedForValues?.[FIRST_FORWARDED_FOR_VALUE_INDEX]?.trim();
  if (buyerIp) return buyerIp;

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  if (process.env.NODE_ENV === "development") return "127.0.0.1";

  throw new Error("buyer IP is required for private SFAPI clients");
}
