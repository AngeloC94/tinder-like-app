import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import ControlsBar from "./ControlsBar";

import type { SwipeCardProps } from "../types/Profile";


export default function SwipeCard({
  profile,
  showMatch,
  onLike,
  onDislike,
  handleNext,
}: SwipeCardProps) {
  return (
    <Card
      data-testid="swipe-card"
      sx={{
        width: 320,
        height: 480,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      {profile.photoUrl ? (
        <CardMedia
          component="img"
          height="360"
          image={profile.photoUrl}
          alt={profile.name}
          data-testid="profile-photo"
        />
      ) : (
        <div
          data-testid="no-photo"
          style={{
            height: 160,
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">No photo</Typography>
        </div>
      )}
      <CardContent>
        <Typography variant="h6" data-testid="profile-name-age">
          {profile.name}, {profile.age}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
          data-testid="profile-bio"
        >
          {profile.bio}
        </Typography>
        <ControlsBar
          showMatch={showMatch}
          onLike={onLike}
          onDislike={onDislike}
          handleNext={handleNext}
        />
      </CardContent>
    </Card>
  );
}
