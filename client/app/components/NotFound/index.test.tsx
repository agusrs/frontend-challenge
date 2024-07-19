import { render, screen } from "@testing-library/react";
import NotFound from "./index";
import "@testing-library/jest-dom";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";

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

describe("NotFound component", () => {
  const message = "No items found";

  test("renders the FontAwesomeIcon component", () => {
    render(<NotFound message={message} />);
    const icon = screen.getByTestId("face-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("data-icon", faFaceFrown.iconName);
  });

  test("renders the message correctly", () => {
    render(<NotFound message={message} />);
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  test("renders the Link component correctly", () => {
    render(<NotFound message={message} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
