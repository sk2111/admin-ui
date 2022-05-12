//libs
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//component
import CheckBox from "./CheckBox";

describe("CheckBox", () => {
  it("should render the checkbox with checked", () => {
    render(<CheckBox checked={true} handleChange={() => {}} />);
    expect(screen.getByTestId("checkbox")).toBeChecked();
  });

  it("should render the checkbox with not checked", () => {
    render(<CheckBox checked={false} handleChange={() => {}} />);
    expect(screen.getByTestId("checkbox")).not.toBeChecked();
  });

  it("should invoke the callback with current checked value", async () => {
    const handleChange = jest.fn();
    render(<CheckBox checked={false} handleChange={handleChange} />);

    const checkBoxRef = screen.getByTestId("checkbox");
    await userEvent.click(checkBoxRef);
    expect(handleChange).toBeCalledWith(true);
  });
});
