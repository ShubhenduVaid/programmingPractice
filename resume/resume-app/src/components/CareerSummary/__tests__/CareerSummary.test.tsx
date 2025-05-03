import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CareerSummary from "../CareerSummary";

describe("CareerSummary", () => {
  const mockProps = {
    careerSummary: {
      headline: "Test Headline",
      highlights: ["Highlight 1", "Highlight 2"],
    },
  };

  it("renders career summary with headline and highlights", () => {
    render(<CareerSummary {...mockProps} />);

    expect(screen.getByText("SUMMARY")).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.careerSummary.headline)
    ).toBeInTheDocument();
    mockProps.careerSummary.highlights.forEach((highlight) => {
      expect(screen.getByText(highlight)).toBeInTheDocument();
    });
  });
});
