import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ImageGrid from "./imageGrid";

describe("ImageGrid Component", () => {
  it("renders images when provided with image URLs", () => {
    const mockImages = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ];

    render(<ImageGrid images={mockImages} />);
    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", mockImages[0]);
    expect(images[1]).toHaveAttribute("src", mockImages[1]);
  });

  it("renders no images when empty array is provided", () => {
    render(<ImageGrid images={[]} />);
    const images = screen.queryAllByRole("img");
    expect(images).toHaveLength(0);
  });
});
