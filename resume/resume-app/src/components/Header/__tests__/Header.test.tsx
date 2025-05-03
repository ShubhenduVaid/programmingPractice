import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../Header";

describe("Header", () => {
  const mockProps = {
    name: "John Doe",
    designation: "Software Engineer",
    contactInfo: {
      email: "john@example.com",
      phoneNumber: "1234567890",
    },
  };

  it("renders header with correct information", () => {
    render(<Header {...mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.designation)).toBeInTheDocument();
    expect(
      screen.getByText(`@ ${mockProps.contactInfo.email}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`📞 ${mockProps.contactInfo.phoneNumber}`)
    ).toBeInTheDocument();
  });
});
