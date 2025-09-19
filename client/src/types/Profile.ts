export type Profile = {
  id: string
  name: string
  age: number
  bio: string
  photoUrl?: string
  status?: 'unseen' | 'liked' | 'disliked'
}

export type SwipeDeckProps = {
  profiles: Profile[];
};

export type SwipeCardProps = {
  profile: Profile;
  showMatch: boolean;
  onLike: () => void;
  onDislike: () => void;
  handleNext: () => void;
};

export type ControlsBarProps = {
  showMatch: boolean;
  onLike: () => void;
  onDislike: () => void;
  handleNext: () => void;
  disabled?: boolean;
};

