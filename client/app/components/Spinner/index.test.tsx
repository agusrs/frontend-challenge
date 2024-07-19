import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "./index";

describe("Spinner component", () => {
  test("renders the Spinner component", () => {
    render(<Spinner />);
    const spinnerDiv = screen.getByRole("status");
    expect(spinnerDiv).toBeInTheDocument();
    expect(spinnerDiv).toHaveClass("spinner");
    expect(spinnerDiv.querySelector("span")).toBeInTheDocument();
  });
});
