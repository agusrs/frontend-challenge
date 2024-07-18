import { render, screen } from "@testing-library/react";
import CurrencyNumber from "./index";
import "@testing-library/jest-dom";

describe("CurrencyNumber component", () => {
  test("renders the correct currency symbol", () => {
    render(<CurrencyNumber currency="$" number={1234.56} />);
    const currency = screen.getByText("$");
    expect(currency).toBeInTheDocument();
  });

  test("formats the integer part of the number correctly", () => {
    render(<CurrencyNumber currency="$" number={1234.56} />);
    const integerPart = screen.getByText("1.235");
    expect(integerPart).toBeInTheDocument();
  });

  test("conditionally renders the decimal part based on showNoDecimals", () => {
    render(
      <CurrencyNumber
        currency="$"
        number={1234.56}
        maxDecimals={2}
        showNoDecimals={true}
      />,
    );
    const decimals = screen.getByText("56");
    expect(decimals).toBeInTheDocument();
  });

  test("does not render the decimal part when showNoDecimals is false and the number is an integer", () => {
    render(
      <CurrencyNumber
        currency="$"
        number={1234}
        maxDecimals={2}
        showNoDecimals={false}
      />,
    );
    const decimals = screen.queryByText("00");
    expect(decimals).not.toBeInTheDocument();
  });

  test("renders the decimal part when the number has decimals even if showNoDecimals is false", () => {
    render(
      <CurrencyNumber
        currency="$"
        number={1234.56}
        maxDecimals={2}
        showNoDecimals={false}
      />,
    );
    const decimals = screen.getByText("56");
    expect(decimals).toBeInTheDocument();
  });
});
