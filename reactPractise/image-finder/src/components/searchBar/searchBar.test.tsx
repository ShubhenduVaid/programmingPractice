import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "./searchBar";

describe("SearchBar Component", () => {
  it("renders search input and submit button", () => {
    const mockHandleSubmit = vi.fn();
    render(<SearchBar handleSubmit={mockHandleSubmit} />);

    expect(screen.getByPlaceholderText("Search..")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("updates input value on change", async () => {
    const mockHandleSubmit = vi.fn();
    render(<SearchBar handleSubmit={mockHandleSubmit} />);

    const input = screen.getByPlaceholderText("Search..");
    await userEvent.type(input, "test");

    expect(input).toHaveValue("test");
  });

  it("calls handleSubmit with input value when button is clicked", async () => {
    const mockHandleSubmit = vi.fn();
    render(<SearchBar handleSubmit={mockHandleSubmit} />);

    const input = screen.getByPlaceholderText("Search..");
    const button = screen.getByRole("button");

    await userEvent.type(input, "test");
    fireEvent.click(button);

    expect(mockHandleSubmit).toHaveBeenCalledWith("test");
  });
});
