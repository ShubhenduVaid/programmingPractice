import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import JobDetail from "../JobDetail";

describe("JobDetail", () => {
  const mockProps = {
    title: "Software Engineer",
    detail: {
      companyName: "Tech Corp",
      from: "2020",
      to: "2023",
      location: "London",
    },
    details: ["Achievement 1", "Achievement 2"],
  };

  it("renders job details correctly", () => {
    render(<JobDetail {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockProps.detail.companyName} | ${mockProps.detail.from} - ${mockProps.detail.to} | ${mockProps.detail.location}`
      )
    ).toBeInTheDocument();
    mockProps.details.forEach((detail) => {
      expect(screen.getByText(detail)).toBeInTheDocument();
    });
  });
});
