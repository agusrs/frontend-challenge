import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemDescription, { ItemDescriptionProps } from "./index";

describe("ItemDescription", () => {
  test("renders description title and description text", () => {
    const props: ItemDescriptionProps = {
      description: "This is a detailed description of the product.",
    };

    render(<ItemDescription {...props} />);

    expect(screen.getByText("Descripción del producto")).toBeInTheDocument();

    expect(screen.getByText(props.description)).toBeInTheDocument();
  });
});
