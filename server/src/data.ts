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
