//libs
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//component
import PaginationList from "./PaginationList";
//constants
import { pagination } from "config/constants";

const {
  firstPageText,
  previousPageText,
  nextPageText,
  lastPageText,
  state,
  pageOffset,
} = pagination;

describe("PaginationList", () => {
  it("should render the list with total pages as prop value", () => {
    const handlePageChange = jest.fn();
    const currentPage = 1;
    render(
      <PaginationList
        currentPage={currentPage}
        totalPages={1}
        handlePageChange={handlePageChange}
      />,
    );

    const renderedItems = [
      firstPageText,
      previousPageText,
      String(currentPage),
      nextPageText,
      lastPageText,
    ];
    const items = screen.getAllByRole("button").map((item) => item.textContent);
    expect(items.length).toEqual(renderedItems.length);
    expect(items).toStrictEqual(renderedItems);
  });

  it("should render the item with active class & none class", () => {
    const handlePageChange = jest.fn();
    render(
      <PaginationList
        currentPage={1}
        totalPages={2}
        handlePageChange={handlePageChange}
      />,
    );

    const items = screen.getAllByRole("button").map((item) => item.className);
    const [firstPage, prevPage, currentPage, secondPage, nextPage] = items;
    expect(firstPage).toContain(state.disabled);
    expect(prevPage).toContain(state.disabled);
    expect(currentPage).toContain(state.active);
    expect(secondPage).toContain(state.none);
    expect(nextPage).toContain(state.none);
  });

  it("should invoke the callback on user click previous pages", async () => {
    const handlePageChange = jest.fn();
    const currentPage = 3;
    render(
      <PaginationList
        currentPage={currentPage}
        totalPages={3}
        handlePageChange={handlePageChange}
      />,
    );

    const items = screen.getAllByRole("button");
    const [firstPage, prevPage] = items;
    await userEvent.click(prevPage);
    expect(handlePageChange).toBeCalledWith(currentPage - pageOffset);
    await userEvent.click(firstPage);
    expect(handlePageChange).toBeCalledWith(1);
  });

  it("should invoke the callback on user click next pages", async () => {
    const handlePageChange = jest.fn();
    const currentPage = 1;
    const totalPages = 5;
    render(
      <PaginationList
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />,
    );

    const items = screen.getAllByRole("button");
    const [lastPage, nextPage] = [items.pop(), items.pop()];
    await userEvent.click(nextPage);
    expect(handlePageChange).toBeCalledWith(currentPage + pageOffset);
    await userEvent.click(lastPage);
    expect(handlePageChange).toBeCalledWith(totalPages);
  });

  it("should invoke the callback on user click numeric pages with numeric value", async () => {
    const handlePageChange = jest.fn();
    const currentPage = 1;
    const totalPages = 5;
    render(
      <PaginationList
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />,
    );

    const items = screen
      .getAllByRole("button")
      .filter((item) => Number(item.textContent));
    for await (const item of items) {
      await userEvent.click(item);
      expect(handlePageChange).toBeCalledWith(+item.textContent);
    }
  });
});
