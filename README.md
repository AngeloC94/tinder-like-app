Node version required >= 20

## TECH STACK
#### Frontend

`Framework: React`

`Language: TypeScript`

`Bundler / Build Tool: Vite`

`UI Library: Material-UI (MUI)`

`Testing: Vitest`

#### Backend

`Runtime: Node.js`

`Framework: Express.js`

`Language: TypeScript`

## MOCK DATA

File: `server/src/data.ts`

```ts
export type Profile = {
  id: string
  name: string
  age: number
  bio: string
  photoUrl?: string
  status?: 'unseen' | 'liked' | 'disliked'
}

export const profiles: Profile[] = [
  { id: '1', name: 'Sarah', age: 28, bio: 'Professional Volleyball player', photoUrl: 'https://randomuser.me/api/portraits/women/32.jpg', status: 'unseen' },
  { id: '2', name: 'Jessica', age: 25, bio: 'Software engineer and music lover', photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg', status: 'unseen' },
  { id: '3', name: 'Lucy', age: 30, bio: 'Traveler and photographer', photoUrl: 'https://randomuser.me/api/portraits/women/56.jpg', status: 'unseen' },
  { id: '4', name: 'Janna', age: 28, bio: 'Chef', photoUrl: 'https://randomuser.me/api/portraits/women/1.jpg', status: 'unseen' },
  { id: '5', name: 'Lulu', age: 25, bio: 'Biker', photoUrl: 'https://randomuser.me/api/portraits/women/47.jpg', status: 'unseen' },
  { id: '6', name: 'Giovanna', age: 30, bio: 'Wizard', photoUrl: 'https://randomuser.me/api/portraits/women/57.jpg', status: 'unseen' },
]
```

## REST API in Node.js and Express.js

#### FETCH MOCK PROFILES `GET /profiles`
```ts
app.get("/profiles", (_req: Request, res: Response) => {
  const unseenProfiles = profiles.filter(p => p.status === 'unseen')
  res.json(unseenProfiles)
})
```

#### SWIPE LOGIC `POST /swipe/:id`
```ts
app.post("/swipe/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const { action } = req.body as { action: 'like' | 'dislike' }

  const profile = profiles.find(p => p.id === id)
  if (!profile) return res.status(404).json({ error: "Profile not found" })

  profile.status = action === 'like' ? 'liked' : 'disliked'
  res.json({ message: `Profile ${action}d successfully`, profile })
})
```
