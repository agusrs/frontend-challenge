import { render, screen } from "@testing-library/react";
import Breadcrumbs, { BreadcrumbsProps } from "./index";
import "@testing-library/jest-dom";

const defaultProps: BreadcrumbsProps = {
  categories: [
    { id: "1", name: "Category 1" },
    { id: "2", name: "Category 2" },
    { id: "3", name: "Category 3" },
  ],
  disableLast: true,
};

describe("Breadcrumbs component", () => {
  test("renders the correct number of categories", () => {
    render(<Breadcrumbs {...defaultProps} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  test("disables the last category link when disableLast is true", () => {
    render(<Breadcrumbs {...defaultProps} disableLast />);
    const links = screen.getAllByRole("link");
    expect(links[2]).toHaveClass("disableLast");
    expect(links[2]).toHaveAttribute("aria-disabled", "true");
    expect(links[2]).toHaveAttribute("tabIndex", "-1");
  });

  test("enables the last category link when disableLast is false", () => {
    render(<Breadcrumbs {...defaultProps} disableLast={false} />);
    const links = screen.getAllByRole("link");
    expect(links[2]).not.toHaveClass("disableLast");
    expect(links[2]).toHaveAttribute("aria-disabled", "false");
    expect(links[2]).not.toHaveAttribute("tabIndex");
  });

  test("links have the correct href attributes", () => {
    render(<Breadcrumbs {...defaultProps} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/items?category=1");
    expect(links[1]).toHaveAttribute("href", "/items?category=2");
    expect(links[2]).toHaveAttribute("href", "/items?category=3");
  });

  test("renders the correct number of arrows", () => {
    render(<Breadcrumbs {...defaultProps} />);
    const icons = screen.getAllByTestId("icon-chevron-right");
    expect(icons).toHaveLength(2);
  });
});
