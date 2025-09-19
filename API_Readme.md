REST API in Node.js and Express.js

*FETCH MOCK PROFILES*

app.get("/profiles", (_req: Request, res: Response) => {
  const unseenProfiles = profiles.filter(p => p.status === 'unseen')
  res.json(unseenProfiles)
})

*SWIPE LOGIC*

app.post("/swipe/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const { action } = req.body as { action: 'like' | 'dislike' }

  const profile = profiles.find(p => p.id === id)
  if (!profile) return res.status(404).json({ error: "Profile not found" })

  profile.status = action === 'like' ? 'liked' : 'disliked'
  res.json({ message: `Profile ${action}d successfully`, profile })
})
