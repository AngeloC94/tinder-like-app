import { render, screen, fireEvent } from "@testing-library/react";
import ControlsBar from "./ControlsBar";
import { describe, it, vi, expect } from "vitest";

describe("ControlsBar", () => {
  it("renders like and dislike buttons when showMatch is false", () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();
    
    render(
      <ControlsBar 
        showMatch={false} 
        onLike={onLike} 
        onDislike={onDislike} 
        handleNext={() => {}} 
      />
    );

    expect(screen.getByLabelText("like-button")).toBeInTheDocument();
    expect(screen.getByLabelText("dislike-button")).toBeInTheDocument();
  });

  it("renders OK button when showMatch is true", () => {
    const handleNext = vi.fn();
    
    render(
      <ControlsBar 
        showMatch={true} 
        onLike={() => {}} 
        onDislike={() => {}} 
        handleNext={handleNext} 
      />
    );

    const okButton = screen.getByRole("button", { name: /ok/i });
    expect(okButton).toBeInTheDocument();

    // Test click
    fireEvent.click(okButton);
    expect(handleNext).toHaveBeenCalled();
  });

  it("calls onLike and onDislike when buttons are clicked", () => {
    const onLike = vi.fn();
    const onDislike = vi.fn();

    render(
      <ControlsBar 
        showMatch={false} 
        onLike={onLike} 
        onDislike={onDislike} 
        handleNext={() => {}} 
      />
    );

    fireEvent.click(screen.getByLabelText("like-button"));
    fireEvent.click(screen.getByLabelText("dislike-button"));

    expect(onLike).toHaveBeenCalled();
    expect(onDislike).toHaveBeenCalled();
  });
});
