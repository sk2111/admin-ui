//libs
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//component
import SearchBar from "./SearchBar";
//mock props
const mock = {
  id: "test-search-id",
  placeholderText: "Search by name, email or role",
  value: "test value",
  userTypedValue: "Admin users",
  debounceTimeInMs: 250,
};

describe("SearchBar", () => {
  const { id, placeholderText, userTypedValue, debounceTimeInMs, value } = mock;

  it("should render the placeholder text and default input value", () => {
    const handleChange = jest.fn();
    render(
      <SearchBar
        id={id}
        placeholder={placeholderText}
        debounceTimeInMs={debounceTimeInMs}
        value={value}
        handleChange={handleChange}
      />,
    );

    expect(screen.getByPlaceholderText(placeholderText).placeholder).toEqual(
      placeholderText,
    );
    expect(screen.getByPlaceholderText(placeholderText).value).toEqual(value);
  });

  it("should reflect the user typed value", async () => {
    const handleChange = jest.fn();
    render(
      <SearchBar
        id={id}
        placeholder={placeholderText}
        debounceTimeInMs={debounceTimeInMs}
        value=""
        handleChange={handleChange}
      />,
    );

    await userEvent.type(
      screen.getByPlaceholderText(placeholderText),
      userTypedValue,
    );
    expect(screen.getByPlaceholderText(placeholderText).value).toEqual(
      userTypedValue,
    );
  });

  it("should invoke the callback with user typed value after debounce", async () => {
    const handleChange = jest.fn();

    render(
      <SearchBar
        id={id}
        placeholder={placeholderText}
        debounceTimeInMs={debounceTimeInMs}
        value=""
        handleChange={handleChange}
      />,
    );

    await userEvent.type(
      screen.getByPlaceholderText(placeholderText),
      userTypedValue,
    );
    await waitFor(() => expect(handleChange).toBeCalledTimes(1));
    expect(handleChange).toBeCalledWith(userTypedValue);
  });
});
