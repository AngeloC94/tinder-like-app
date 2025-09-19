import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import type { Profile } from "./types/Profile";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Sarah",
    age: 28,
    bio: "Professional Volleyball player",
    photoUrl: "https://randomuser.me/api/portraits/women/32.jpg",
    status: "unseen",
  },
  {
    id: "2",
    name: "Jessica",
    age: 25,
    bio: "Software engineer and music lover",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "unseen",
  },
];

let capturedProfiles: Profile[] = [];

describe("App component", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_URL", "http://localhost:4000");
    capturedProfiles = [];

    vi.mock("./components/SwipeDeck", () => ({
      default: ({ profiles }: { profiles: Profile[] }) => {
        capturedProfiles = profiles;
        return <div data-testid="swipe-deck">SwipeDeck</div>;
      },
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches profiles and renders SwipeDeck", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockProfiles,
    } as Response);

    render(<App />);

    await waitFor(() => screen.getByTestId("swipe-deck"));

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:4000/profiles"
    );

    expect(capturedProfiles).toHaveLength(mockProfiles.length);
    expect(capturedProfiles[0].name).toBe("Sarah");
  });

  it("renders error message on fetch failure", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

    render(<App />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Error: Network error");
  });

  it("handles non-ok response gracefully", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as Response);

    render(<App />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Error: Failed to fetch profiles");
  });

  it("renders empty SwipeDeck when no profiles returned", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    render(<App />);

    await waitFor(() => screen.getByTestId("swipe-deck"));

    expect(capturedProfiles).toHaveLength(0);
  });
});
