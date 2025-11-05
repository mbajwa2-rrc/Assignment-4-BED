import express, { Express, Request, Response } from "express"

const app: Express = express()
app.use(express.json())

app.get("/api/v1/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found" })
})

export default app
