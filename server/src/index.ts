
import express, { Request, Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { profiles } from "./data"

const app = express()
const PORT = 4000

app.use(cors())
app.use(bodyParser.json())

app.get("/profiles", (_req: Request, res: Response) => {
  const unseenProfiles = profiles.filter(p => p.status === 'unseen')
  res.json(unseenProfiles)
})

app.post("/swipe/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const { action } = req.body as { action: 'like' | 'dislike' }

  const profile = profiles.find(p => p.id === id)
  if (!profile) return res.status(404).json({ error: "Profile not found" })

  profile.status = action === 'like' ? 'liked' : 'disliked'
  res.json({ message: `Profile ${action}d successfully`, profile })
})

// Avvio server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
