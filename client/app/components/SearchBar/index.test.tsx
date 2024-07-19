import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./index";

const mockUseRouter = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
  useSearchParams: () => mockUseSearchParams(),
}));

describe("SearchBar component", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: jest.fn() });
    mockUseSearchParams.mockReturnValue(new URLSearchParams(""));
  });

  test("renders the SearchBar component", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Nunca dejes de buscar"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  test("updates the input value when typing", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Nunca dejes de buscar");
    fireEvent.change(input, { target: { value: "test search" } });
    expect(input).toHaveValue("test search");
  });

  test("navigates to the search results page on form submission", () => {
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Nunca dejes de buscar");
    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.submit(screen.getByTestId("form"));
    expect(mockPush).toHaveBeenCalledWith("/items?search=test%20search");
  });

  test("focuses the input if form is submitted with empty input", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Nunca dejes de buscar");
    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(input).toHaveFocus();
  });

  test("sets the initial value from searchParams", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("search=initial"));
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Nunca dejes de buscar");
    expect(input).toHaveValue("initial");
  });
});
