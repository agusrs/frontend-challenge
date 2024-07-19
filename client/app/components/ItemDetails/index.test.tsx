import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemDetails, { ItemDetailsProps } from "./index";
import translateCondition from "@/app/utils/translateCondition";

jest.mock("../CurrencyNumber", () => {
  const MockedCurrencyNumber = ({
    currency,
    number,
    maxDecimals,
    showNoDecimals,
  }: {
    currency: string;
    number: number;
    maxDecimals: number;
    showNoDecimals: boolean;
  }) => (
    <div data-testid="currency-number">{`Mocked CurrencyNumber ${currency} ${number.toFixed(maxDecimals)}`}</div>
  );
  return MockedCurrencyNumber;
});

jest.mock("../../utils/translateCondition", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ItemDetails", () => {
  const mockItem: ItemDetailsProps["item"] = {
    id: "1",
    title: "Test Item",
    condition: "new",
    sold_quantity: 5,
    price: {
      currency: "USD",
      amount: 100,
      decimals: 2,
    },
    picture: "/test.jpg",
    free_shipping: false,
    description: null,
    categories: [],
  };

  beforeEach(() => {
    (translateCondition as jest.Mock).mockReturnValue("Nuevo");
  });

  test("renders item details with correct information", () => {
    render(<ItemDetails item={mockItem} />);

    const image = screen.getByAltText(mockItem.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      mockItem.picture
        ? expect.stringContaining(mockItem.picture.replace("/", ""))
        : "",
    );

    const condition = screen.getByText("Nuevo - 5 vendidos");
    expect(condition).toBeInTheDocument();

    const title = screen.getByText(mockItem.title);
    expect(title).toBeInTheDocument();

    const price = screen.getByTestId("currency-number");
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent("USD 100.00");

    const link = screen.getByText("Comprar");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  test("renders item details without sold quantity", () => {
    const itemWithoutSoldQuantity = { ...mockItem, sold_quantity: null };
    render(<ItemDetails item={itemWithoutSoldQuantity} />);

    const condition = screen.getByText("Nuevo");
    expect(condition).toBeInTheDocument();
  });

  test("renders default image when picture is null", () => {
    const itemWithoutPicture = { ...mockItem, picture: null };
    render(<ItemDetails item={itemWithoutPicture} />);

    const image = screen.getByAltText(mockItem.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("img.jpg"));
  });

  test("renders price with default currency when currency is null", () => {
    const itemWithoutCurrency = {
      ...mockItem,
      price: { ...mockItem.price, currency: null },
    };
    render(<ItemDetails item={itemWithoutCurrency} />);

    const price = screen.getByText("Mocked CurrencyNumber", { exact: false });
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent("$ 100.00");
  });

  test("renders price with default decimals when decimals is null", () => {
    const itemWithoutDecimals = {
      ...mockItem,
      price: { ...mockItem.price, decimals: null },
    };
    render(<ItemDetails item={itemWithoutDecimals} />);

    const price = screen.getByText("Mocked CurrencyNumber", { exact: false });
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent("USD 100.00");
  });
});
