import { useEffect, useState } from "react";
import "./App.css";
import { Box } from "@mui/material";
import SwipeDeck from "./components/SwipeDeck";
import type { Profile } from "./types/Profile";

function App() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const PROD_API_URL = import.meta.env.VITE_API_URL_PRODUCTION;
  const DEV_API_URL =
    import.meta.env.VITE_API_URL_LOCAL || "http://localhost:4000";

  const API_URLS = [PROD_API_URL, DEV_API_URL];

  useEffect(() => {
    const fetchProfiles = async () => {
      let lastError: any = null;

      for (const url of API_URLS) {
        if (!url) continue;
        try {
          const res = await fetch(`${url}/profiles`);
          if (!res.ok) throw new Error(`Failed to fetch profiles from ${url}`);
          const data: Profile[] = await res.json();
          setProfiles(data);
          return;
        } catch (err: any) {
          lastError = err;
        }
      }
      setError(lastError?.message || "Unknown error");
    };

    fetchProfiles();
  }, []);

  if (error) {
    return <div role="alert">Error: {error}</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: "80%",
        borderRadius: 2,
      }}
    >
      <SwipeDeck profiles={profiles} />
    </Box>
  );
}

export default App;
