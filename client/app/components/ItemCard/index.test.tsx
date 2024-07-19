import { render, screen } from "@testing-library/react";
import ItemCard from "./index";
import "@testing-library/jest-dom";

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

jest.mock("../CurrencyNumber", () => {
  const MockedCurrencyNumber = ({
    currency,
    number,
    maxDecimals,
  }: {
    currency: string;
    number: number;
    maxDecimals: number;
  }) => (
    <div>
      Mocked CurrencyNumber {`${currency} ${number.toFixed(maxDecimals)}`}
    </div>
  );
  return MockedCurrencyNumber;
});

describe("ItemCard component", () => {
  const item = {
    id: "1",
    picture: "/test.jpg",
    title: "Test Item",
    price: {
      currency: "USD",
      amount: 100,
      decimals: 2,
    },
    free_shipping: true,
    condition: "new",
    location: "Test Location",
  };

  test("renders the item link correctly", () => {
    render(<ItemCard item={item} />);
    const itemLink = screen.getAllByRole("link");
    expect(itemLink).toHaveLength(3);
    itemLink.forEach((link) => {
      expect(link).toHaveAttribute("href", `/items/${item.id}`);
    });
  });

  test("renders the image correctly", () => {
    render(<ItemCard item={item} />);
    const image = screen.getByAltText(item.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(item.picture.replace("/", "")),
    );
    expect(image).toHaveAttribute("width", "180");
    expect(image).toHaveAttribute("height", "180");
  });

  test("renders default image when picture is null", () => {
    const itemWithoutPicture = { ...item, picture: null };
    render(<ItemCard item={itemWithoutPicture} />);

    const image = screen.getByAltText(item.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("img.jpg"));
  });

  test("renders the CurrencyNumber component", () => {
    render(<ItemCard item={item} />);
    const currencyNumber = screen.getByText("Mocked CurrencyNumber", {
      exact: false,
    });
    expect(currencyNumber).toBeInTheDocument();
  });

  test("renders price with default currency when currency is null", () => {
    const itemWithoutCurrency = {
      ...item,
      price: { ...item.price, currency: null },
    };
    render(<ItemCard item={itemWithoutCurrency} />);

    const price = screen.getByText("Mocked CurrencyNumber", { exact: false });
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent("$ 100.00");
  });

  test("renders price with default decimals when decimals is null", () => {
    const itemWithoutDecimals = {
      ...item,
      price: { ...item.price, decimals: null },
    };
    render(<ItemCard item={itemWithoutDecimals} />);

    const price = screen.getByText("Mocked CurrencyNumber", { exact: false });
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent("USD 100.00");
  });

  test("renders the free shipping icon conditionally", () => {
    render(<ItemCard item={item} />);
    const shippingIcon = screen.getByTitle("Envío gratis");
    expect(shippingIcon).toBeInTheDocument();
  });

  test("renders the title correctly", () => {
    render(<ItemCard item={item} />);
    const title = screen.getByText(item.title);
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("title", item.title);
  });

  test("renders the location correctly", () => {
    render(<ItemCard item={item} />);
    const location = screen.getByTestId("location");
    expect(location).toBeInTheDocument();
  });

  test("renders empty location when location is null", () => {
    const itemWithoutLocation = { ...item, location: null };
    render(<ItemCard item={itemWithoutLocation} />);

    const location = screen.getByTestId("location");
    expect(location).toBeInTheDocument();
  });
});
