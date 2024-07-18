import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./index";
import logo from "../../../public/logo-meli.png";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    isFallback: false,
  }),
  useSearchParams: () => ({
    get: () => {},
    query: {
      taskId: "testId",
    },
  }),
}));

jest.mock("../SearchBar", () => {
  const MockedSearchBar = () => <div>Mocked SearchBar</div>;
  return MockedSearchBar;
});

describe("Header component", () => {
  test("renders the logo image correctly", () => {
    render(<Header />);
    const logoImg = screen.getByAltText("logo");
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute(
      "src",
      expect.stringContaining(logo.src.replace("/", "")),
    );
  });

  test("renders the logo link correctly", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link");
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
  });

  test("renders the SearchBar component", () => {
    render(<Header />);
    const searchBar = screen.getByText("Mocked SearchBar");
    expect(searchBar).toBeInTheDocument();
  });
});
