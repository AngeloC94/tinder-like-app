import { render, screen, fireEvent } from "@testing-library/react";
import SwipeCard from "./SwipeCard";
import type { Profile } from "../types/Profile";
import { describe, it, vi, expect } from "vitest";

const profile: Profile = {
  id: "1",
  name: "Sarah",
  age: 28,
  bio: "Professional Volleyball player",
  photoUrl: "https://randomuser.me/api/portraits/women/32.jpg",
  status: "unseen",
};

describe("SwipeCard", () => {
  it("renders profile info correctly", () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();
    const handleNext = vi.fn();

    render(
      <SwipeCard
        profile={profile}
        showMatch={false}
        onLike={onLike}
        onDislike={onDislike}
        handleNext={handleNext}
      />
    );

    expect(screen.getByText(/Sarah/i)).toBeInTheDocument();
    expect(screen.getByText(/28/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Professional Volleyball player/i)
    ).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", profile.photoUrl);
    expect(img).toHaveAttribute("alt", profile.name);
  });

  it("renders 'No photo' when photoUrl is missing", () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();
    const handleNext = vi.fn();

    render(
      <SwipeCard
        profile={{ ...profile, photoUrl: "" }}
        showMatch={false}
        onLike={onLike}
        onDislike={onDislike}
        handleNext={handleNext}
      />
    );

    expect(screen.getByText(/No photo/i)).toBeInTheDocument();
  });

  it("calls onLike and onDislike when buttons are clicked", () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();
    const handleNext = vi.fn();

    render(
      <SwipeCard
        profile={profile}
        showMatch={false}
        onLike={onLike}
        onDislike={onDislike}
        handleNext={handleNext}
      />
    );

    fireEvent.click(screen.getByLabelText("like-button"));
    fireEvent.click(screen.getByLabelText("dislike-button"));

    expect(onLike).toHaveBeenCalled();
    expect(onDislike).toHaveBeenCalled();
  });

  it("calls handleNext when OK button in overlay is clicked", () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();
    const handleNext = vi.fn();

    render(
      <SwipeCard
        profile={profile}
        showMatch={true}
        onLike={onLike}
        onDislike={onDislike}
        handleNext={handleNext}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /ok/i }));
    expect(handleNext).toHaveBeenCalled();
  });
});
