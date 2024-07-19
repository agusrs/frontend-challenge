import { render, screen } from "@testing-library/react";
import Pagination, { PaginationProps } from "./index";
import "@testing-library/jest-dom";
import { useSearchParams } from "next/navigation";

const mockUseSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    isFallback: false,
  }),
  useSearchParams: () => mockUseSearchParams(),
  usePathname: jest.fn(() => "/items"),
}));

describe("Pagination component", () => {
  const defaultProps: PaginationProps = {
    totalPages: 10,
  };

  test("renders the Pagination component with correct number of pages", () => {
    mockUseSearchParams.mockReturnValueOnce(new URLSearchParams({ page: "1" }));
    render(<Pagination {...defaultProps} />);
    const pageItems = screen.getAllByTestId("page-item");
    expect(pageItems).toHaveLength(6);
  });

  test("doesn't render the left navigation arrow when the first page is the one selected", () => {
    mockUseSearchParams.mockReturnValueOnce(new URLSearchParams({ page: "1" }));
    render(<Pagination {...defaultProps} />);
    const leftArrow = screen.queryByTestId("left-arrow");
    expect(leftArrow).toBeNull();
  });

  test("renders the right navigation arrow conditionally", () => {
    mockUseSearchParams.mockReturnValueOnce(new URLSearchParams({ page: "1" }));
    render(<Pagination {...defaultProps} />);
    const rightArrow = screen.getByTestId("right-arrow");
    expect(rightArrow).toBeInTheDocument();
    expect(rightArrow).toHaveAttribute("href", "/items?page=2");
  });

  test("renders the left navigation arrow conditionally", () => {
    mockUseSearchParams.mockReturnValueOnce(new URLSearchParams({ page: "2" }));
    render(<Pagination {...defaultProps} />);
    const leftArrow = screen.getByTestId("left-arrow");
    expect(leftArrow).toBeInTheDocument();
    expect(leftArrow).toHaveAttribute("href", "/items?page=1");
  });

  test("renders correctly when there is no page search param", () => {
    mockUseSearchParams.mockReturnValueOnce(new URLSearchParams());
    render(<Pagination {...defaultProps} />);
    const pageItems = screen.getAllByTestId("page-item");
    expect(pageItems).toHaveLength(6);
  });

  test("renders correct page links for higher pages", () => {
    mockUseSearchParams.mockReturnValueOnce(new URLSearchParams({ page: "7" }));
    render(<Pagination {...defaultProps} />);
    const pageItems = screen.getAllByTestId("page-item");
    expect(pageItems).toHaveLength(5);
    expect(screen.getByText("7")).toHaveClass("selected");
  });

  test('renders ellipsis ("...") when appropriate', () => {
    mockUseSearchParams.mockReturnValueOnce(new URLSearchParams({ page: "7" }));
    render(<Pagination totalPages={20} />);
    const ellipsis = screen.getAllByText("...");
    expect(ellipsis).toHaveLength(2);
  });
});
