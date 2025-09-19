import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeCard from "./SwipeCard";
import type { SwipeDeckProps } from "../types/Profile";

export default function SwipeDeck({ profiles }: SwipeDeckProps) {
  const [index, setIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);

  const currentProfile = profiles[index];

  const PROD_API_URL = import.meta.env.VITE_API_URL_PRODUCTION;
  const DEV_API_URL =
    import.meta.env.VITE_API_URL_LOCAL || "http://localhost:4000";
  const API_URLS = [PROD_API_URL, DEV_API_URL];

  const handleNext = () => {
    setShowMatch(false);
    if (index < profiles.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(profiles.length);
    }
  };

  async function tryFetch(path: string, options?: RequestInit) {
    let lastError: any = null;

    for (const url of API_URLS) {
      if (!url) continue;
      try {
        const res = await fetch(`${url}${path}`, options);
        if (!res.ok) throw new Error(`Failed fetch from ${url}`);
        return res; 
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error("All API endpoints failed");
  }

  const handleLike = async () => {
    if (!currentProfile) return;
    try {
      await tryFetch(`/swipe/${currentProfile.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
      setShowMatch(true);
    } catch (error) {
      console.error("Error liking profile:", error);
    }
  };

  const handleDislike = async () => {
    if (!currentProfile) return;
    try {
      await tryFetch(`/swipe/${currentProfile.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "dislike" }),
      });
      handleNext();
    } catch (error) {
      console.error("Error disliking profile:", error);
    }
  };

  if (!currentProfile) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">No more profiles!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", position: "relative" }}>
      <SwipeCard
        profile={currentProfile}
        showMatch={showMatch}
        onLike={handleLike}
        onDislike={handleDislike}
        handleNext={handleNext}
      />
      {showMatch && (
        <Box
          data-testid="match-overlay"
          sx={{
            position: "absolute",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: 320,
            height: 480,
            bgcolor: "rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            gap: "20px",
          }}
        >
          <Typography variant="h4" sx={{ color: "white", mb: 3 }}>
            🎉 It's a Match with {currentProfile.name}!
          </Typography>
        </Box>
      )}
    </Box>
  );
}
