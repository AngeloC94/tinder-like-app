import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "@mui/material";
import type { ControlsBarProps } from "../types/Profile";

export default function ControlsBar({
  showMatch,
  onLike,
  onDislike,
  handleNext,
  disabled,
}: ControlsBarProps) {
  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
      <Fab aria-label="dislike-button" onClick={onDislike} disabled={disabled}>
        <CloseOutlinedIcon color="primary" />
      </Fab>
      {!showMatch ? (
        <Fab aria-label="like-button" onClick={onLike} disabled={disabled}>
          <FavoriteBorderOutlinedIcon color="error" />
        </Fab>
      ) : (
        <Button
          sx={{
            position: "relative",
            zIndex: 10000,
            borderRadius: 50
          }}
          color="primary"
          variant="contained"
          onClick={handleNext}
        >
          OK
        </Button>
      )}
    </Box>
  );
}
