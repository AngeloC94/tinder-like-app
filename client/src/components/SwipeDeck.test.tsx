import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SwipeDeck from "./SwipeDeck";
import type { Profile } from "../types/Profile";
import { describe, it, vi, beforeEach, expect } from "vitest";
import "@testing-library/jest-dom";

describe("SwipeDeck", () => {
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

  let fetchMock: any;

  beforeEach(() => {
    vi.restoreAllMocks();
    fetchMock = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    );
    global.fetch = fetchMock as any;
  });

  it("renders the first profile", () => {
    render(<SwipeDeck profiles={mockProfiles} />);
    expect(screen.getByText(/Sarah/i)).toBeInTheDocument();
  });

  it("moves to next profile on dislike", async () => {
    render(<SwipeDeck profiles={mockProfiles} />);
    fireEvent.click(screen.getByLabelText("dislike-button"));

    await waitFor(() => expect(screen.getByText(/Jessica/i)).toBeInTheDocument());
  });

  it("shows match overlay on like", async () => {
    render(<SwipeDeck profiles={mockProfiles} />);
    fireEvent.click(screen.getByLabelText("like-button"));

    await waitFor(() =>
      expect(
        screen.getByText((content) => content.includes("It's a Match with Sarah"))
      ).toBeInTheDocument()
    );
  });

  it("goes to next profile after clicking OK in match overlay", async () => {
    render(<SwipeDeck profiles={mockProfiles} />);
    fireEvent.click(screen.getByLabelText("like-button"));

    await waitFor(() =>
      expect(
        screen.getByText((content) => content.includes("It's a Match with Sarah"))
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: /ok/i }));
    await waitFor(() => expect(screen.getByText(/Jessica/i)).toBeInTheDocument());
  });

  it("shows 'No more profiles' when list is empty", () => {
    render(<SwipeDeck profiles={[]} />);
    expect(screen.getByText(/No more profiles/i)).toBeInTheDocument();
  });

  it("shows 'No more profiles' after swiping all profiles", async () => {
    render(
      <SwipeDeck profiles={[{ id: "1", name: "Alice", age: 25, bio: "" }]} />
    );
    fireEvent.click(screen.getByLabelText("dislike-button"));

    await waitFor(() => expect(screen.getByText(/No more profiles/i)).toBeInTheDocument());
  });

  it("calls fetch with 'like' when liking a profile", async () => {
    render(<SwipeDeck profiles={mockProfiles} />);
    fireEvent.click(screen.getByLabelText("like-button"));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      `http://localhost:4000/swipe/1`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ action: "like" }),
      })
    );
  });

  it("calls fetch with 'dislike' when disliking a profile", async () => {
    render(<SwipeDeck profiles={mockProfiles} />);
    fireEvent.click(screen.getByLabelText("dislike-button"));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      `http://localhost:4000/swipe/1`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ action: "dislike" }),
      })
    );
  });
});
