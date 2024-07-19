import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Items, { getItems } from "./index";
import { GetItemsResponse } from "@/app/types/response";

jest.mock("../Breadcrumbs", () => {
  const MockedBreadcrumbs = () => <div data-testid="breadcrumbs" />;
  return MockedBreadcrumbs;
});

jest.mock("../ItemCard", () => {
  const MockedItemCard = ({ item }: { item: any }) => (
    <div data-testid="item-card" />
  );
  return MockedItemCard;
});

jest.mock("../NotFound", () => {
  const MockedNotFound = ({ message }: { message: string }) => (
    <div data-testid="no-items">{message}</div>
  );
  return MockedNotFound;
});

jest.mock("../Pagination", () => {
  const MockedPagination = ({ totalPages }: { totalPages: number }) => (
    <div data-testid="pagination">{totalPages}</div>
  );
  return MockedPagination;
});

const mockFetchResponse = (
  response: Partial<GetItemsResponse>,
  ok: boolean,
) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: ok,
      json: () => Promise.resolve(response),
    } as Response),
  );
};

const mockFetchReject = (error: Error) => {
  global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

describe("Items page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders NoItems component when no items are found", async () => {
    mockFetchResponse({ items: [] }, true);

    render(await Items({ searchParams: { search: "test" } }));

    expect(await screen.findByTestId("no-items")).toBeInTheDocument();
  });

  test("renders Breadcrumbs, ItemCard, and Pagination components when items are found", async () => {
    const mockResponse: Partial<GetItemsResponse> = {
      items: [
        {
          id: "1",
          title: "Item 1",
          price: { currency: "USD", amount: 100, decimals: 2 },
          picture: "item1.jpg",
          free_shipping: true,
          location: "Location 1",
          condition: "used",
        },
      ],
      categories: [{ id: "1", name: "Category 1" }],
      pagination: { total: 10 },
    };
    mockFetchResponse(mockResponse, true);

    render(await Items({ searchParams: { search: "test" } }));

    expect(await screen.findByTestId("breadcrumbs")).toBeInTheDocument();
    expect(screen.getAllByTestId("item-card")).toHaveLength(1);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  test("renders Breadcrumbs and Pagination with correct data", async () => {
    const mockResponse: Partial<GetItemsResponse> = {
      items: [
        {
          id: "1",
          title: "Item 1",
          price: { currency: "USD", amount: 100, decimals: 2 },
          picture: "item1.jpg",
          free_shipping: true,
          location: "Location 1",
          condition: "new",
        },
      ],
      categories: [{ id: "1", name: "Category 1" }],
      pagination: { total: 10 },
    };
    mockFetchResponse(mockResponse, true);

    render(await Items({ searchParams: { search: "test" } }));

    const pagination = await screen.findByTestId("pagination");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent("10");

    const breadcrumbs = screen.getByTestId("breadcrumbs");
    expect(breadcrumbs).toBeInTheDocument();
  });
});

describe("getItems function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns undefined for empty searchParams", async () => {
    const result = await getItems({});
    expect(result).toBeUndefined();
  });

  test("returns undefined for invalid page number", async () => {
    const result = await getItems({ page: "251" });
    expect(result).toBeUndefined();
  });

  test("fetches data correctly with search parameter", async () => {
    const mockResponse: Partial<GetItemsResponse> = {
      items: [
        {
          id: "1",
          title: "Item 1",
          price: {
            currency: null,
            decimals: null,
            amount: 0,
          },
          picture: null,
          condition: "new",
          free_shipping: false,
          location: null,
        },
      ],
      categories: [{ id: "1", name: "Category 1" }],
      pagination: { total: 10 },
    };
    mockFetchResponse(mockResponse, true);

    const result = await getItems({ search: "test" });
    expect(result).toEqual(mockResponse);
  });

  test("fetches data correctly with category parameter", async () => {
    const mockResponse: Partial<GetItemsResponse> = {
      items: [
        {
          id: "1",
          title: "Item 1",
          price: {
            currency: null,
            decimals: null,
            amount: 0,
          },
          picture: null,
          condition: "new",
          free_shipping: false,
          location: null,
        },
      ],
      categories: [{ id: "1", name: "Category 1" }],
      pagination: { total: 10 },
    };
    mockFetchResponse(mockResponse, true);

    const result = await getItems({ category: "1", page: "1" });
    expect(result).toEqual(mockResponse);
  });

  test("handles fetch errors gracefully", async () => {
    mockFetchReject(new Error("Network Error"));

    const result = await getItems({ search: "test" });
    expect(result).toBeUndefined();
  });

  test("handles fetch response not ok gracefully", async () => {
    mockFetchResponse({}, false);

    const result = await getItems({ search: "test" });
    expect(result).toBeUndefined();
  });
});
