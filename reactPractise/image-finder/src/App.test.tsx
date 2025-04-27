import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import App from "./App";

describe("App Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the NASA Image Gallery title", () => {
    render(<App />);
    expect(screen.getByText("Nasa Image Gallery")).toBeInTheDocument();
  });

  it("fetches and displays images when search is submitted", async () => {
    const mockImages = ["image1.jpg", "image2.jpg"];
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: { response: mockImages } }),
    });

    render(<App />);
    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button");

    await userEvent.type(searchInput, "moon");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/?q=moon"
      );
    });
  });

  it("handles API errors gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (global.fetch as any).mockRejectedValueOnce(new Error("API Error"));

    render(<App />);
    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button");

    await userEvent.type(searchInput, "moon");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
