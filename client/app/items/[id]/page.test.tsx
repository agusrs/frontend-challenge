import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DetailPage, { getItemDetail } from "./page";
import { GetItemDetailResponse } from "@/app/types/response";
import { notFound } from "next/navigation";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("../../components/Breadcrumbs", () => {
  return function MockedBreadcrumbs({ categories }: { categories: any }) {
    return <div data-testid="breadcrumbs">{categories.join(", ")}</div>;
  };
});

jest.mock("../../components/ItemDetails", () => {
  return function MockedItemDetails({ item }: { item: any }) {
    return <div data-testid="item-details">{item.title}</div>;
  };
});

jest.mock("../../components/ItemDescription", () => {
  return function MockedItemDescription({
    description,
  }: {
    description: string;
  }) {
    return <div data-testid="item-description">{description}</div>;
  };
});

const mockFetchResponse = (
  response: Partial<GetItemDetailResponse> | undefined,
) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
    } as Response),
  );
};

const mockFetchReject = (error: string) => {
  global.fetch = jest
    .fn()
    .mockImplementation(() => Promise.reject(new Error(error)));
};

describe("DetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Breadcrumbs, ItemDetails, and ItemDescription components when item is found", async () => {
    const mockResponse: Partial<GetItemDetailResponse> = {
      item: {
        id: "1",
        title: "Test Item",
        categories: [
          { id: "1", name: "Category 1" },
          { id: "2", name: "Category 2" },
        ],
        picture: "/test.jpg",
        condition: "new",
        price: { currency: "USD", amount: 100, decimals: 2 },
        description: "Test Description",
        sold_quantity: 10,
        free_shipping: false,
      },
    };
    mockFetchResponse(mockResponse);

    render(await DetailPage({ params: { id: "1" } }));

    expect(await screen.findByTestId("breadcrumbs")).toBeInTheDocument();
    expect(screen.getByTestId("item-details")).toBeInTheDocument();
    expect(screen.getByTestId("item-description")).toBeInTheDocument();
  });

  test("calls notFound when item is not found", async () => {
    mockFetchResponse(undefined);

    render(await DetailPage({ params: { id: "non-existent-id" } }));

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });

  test("does not render ItemDescription when description is empty", async () => {
    const mockResponse: Partial<GetItemDetailResponse> = {
      item: {
        id: "1",
        title: "Test Item",
        categories: [
          { id: "1", name: "Category 1" },
          { id: "2", name: "Category 2" },
        ],
        picture: "/test.jpg",
        condition: "new",
        price: { currency: "USD", amount: 100, decimals: 2 },
        description: "",
        sold_quantity: 10,
        free_shipping: false,
      },
    };
    mockFetchResponse(mockResponse);

    render(await DetailPage({ params: { id: "1" } }));

    expect(await screen.findByTestId("breadcrumbs")).toBeInTheDocument();
    expect(screen.getByTestId("item-details")).toBeInTheDocument();
    expect(screen.queryByTestId("item-description")).not.toBeInTheDocument();
  });

  test("handles fetch errors gracefully", async () => {
    mockFetchReject("Network Error");

    render(await DetailPage({ params: { id: "1" } }));

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });
});

describe("getItemDetail function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches data correctly", async () => {
    const mockResponse: Partial<GetItemDetailResponse> = {
      item: {
        id: "1",
        title: "Test Item",
        categories: [
          { id: "1", name: "Category 1" },
          { id: "2", name: "Category 2" },
        ],
        picture: "/test.jpg",
        condition: "new",
        price: { currency: "USD", amount: 100, decimals: 2 },
        description: "Test Description",
        sold_quantity: 10,
        free_shipping: false,
      },
    };
    mockFetchResponse(mockResponse);

    const result = await getItemDetail("1");
    expect(result).toEqual(mockResponse);
  });

  test("returns undefined and logs error when fetch fails", async () => {
    console.error = jest.fn();
    mockFetchReject("Network Error");

    const result = await getItemDetail("1");
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith("Error al buscar producto 1");
  });

  test("returns undefined when response is not ok", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
      } as Response),
    );
    console.error = jest.fn();

    const result = await getItemDetail("1");
    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith("Error al buscar producto 1");
  });
});
