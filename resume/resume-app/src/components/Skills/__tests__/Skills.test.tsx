import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Skills from "../Skills";

describe("Skills", () => {
  const mockProps = {
    skills: {
      skillType: "Technical Skills",
      skills: ["React", "TypeScript", "Node.js"],
    },
  };

  it("renders skills section with all skills", () => {
    render(<Skills {...mockProps} />);

    expect(screen.getByText(mockProps.skills.skillType)).toBeInTheDocument();
    mockProps.skills.skills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });
});
