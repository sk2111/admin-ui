//libs
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//component
import Button from "./Button";
//mock props
const mock = {
  themePrimary: "primary",
  themeDanger: "danger",
  btnText: "Delete",
};

describe("Button", () => {
  it("should render the button with children text", () => {
    const handleClick = jest.fn();
    render(
      <Button theme={mock.themePrimary} handleClick={handleClick}>
        {mock.btnText}
      </Button>,
    );

    expect(screen.getByRole("button").textContent).toBe(mock.btnText);
  });

  it("should render the checkbox with prop theme", () => {
    const handleClick = jest.fn();
    render(
      <Button theme={mock.themeDanger} handleClick={handleClick}>
        {mock.btnText}
      </Button>,
    );

    expect(screen.getByRole("button").getAttribute("data-theme")).toBe(
      "danger",
    );
  });

  it("should invoke the callback on user click", async () => {
    const handleClick = jest.fn();
    render(
      <Button theme={mock.themePrimary} handleClick={handleClick}>
        {mock.btnText}
      </Button>,
    );

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toBeCalledTimes(1);
  });
});
