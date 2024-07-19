import { render, screen, waitFor } from "@testing-library/react";
import ItemsPage from "./page";
import "@testing-library/jest-dom";

jest.mock("../components/Items", () => {
  const MockedItems = ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | undefined };
  }) => (
    <div data-testid="items">
      <p>SearchParams: {JSON.stringify(searchParams)}</p>
    </div>
  );
  return MockedItems;
});

describe("ItemsPage", () => {
  test("renders Items component with correct props", async () => {
    render(<ItemsPage searchParams={{ search: "test", page: "1" }} />);

    await waitFor(() => {
      expect(screen.getByTestId("items")).toBeInTheDocument();
      expect(screen.getByText(/SearchParams/)).toHaveTextContent(
        JSON.stringify({ search: "test", page: "1" }),
      );
    });
  });
});
