import express, { Express, Request, Response } from "express";

const app: Express = express();
app.use(express.json());

app.get("/api/v1/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/v1/moderation/test", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid Authorization header" });
  }

  res.status(200).json({
    ok: true,
    message: "Token verified successfully!",
    token: token.substring(0, 20) + "..."
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;


