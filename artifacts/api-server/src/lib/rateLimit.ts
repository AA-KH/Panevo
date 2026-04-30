import type { Request, Response, NextFunction } from "express";

export function makeRateLimiter(windowMs: number, max: number) {
  const requests = new Map<string, number[]>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || "unknown";
    const now = Date.now();
    const windowStart = now - windowMs;

    let timestamps = requests.get(ip) || [];
    
    // Filter timestamps within the current window
    timestamps = timestamps.filter(t => t > windowStart);
    
    if (timestamps.length >= max) {
      res.status(429).json({ ok: false, error: "Too many requests. Please try again later." });
      return;
    }

    timestamps.push(now);
    requests.set(ip, timestamps);
    next();
  };
}
