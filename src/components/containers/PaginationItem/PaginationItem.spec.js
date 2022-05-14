//libs
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//component
import PaginationItem from "./PaginationItem";

describe("PaginationItem", () => {
  it("should render the item with children text", () => {
    const handleClick = jest.fn();
    render(<PaginationItem handleClick={handleClick}>testText</PaginationItem>);

    expect(screen.getByRole("button").textContent).toBe("testText");
  });

  it("should render the item with prop class", () => {
    const handleClick = jest.fn();
    render(
      <PaginationItem state="active" handleClick={handleClick}>
        Test
      </PaginationItem>,
    );

    expect(screen.getByRole("button").className).toContain("active");
  });

  it("should invoke the callback on user click", async () => {
    const handleClick = jest.fn();
    render(<PaginationItem handleClick={handleClick}>Test</PaginationItem>);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toBeCalledTimes(1);
  });
});
