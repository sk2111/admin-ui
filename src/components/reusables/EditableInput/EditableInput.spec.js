//libs
import React from "react";
import { render, screen } from "@testing-library/react";
//component
import EditableInput from "./EditableInput";

describe("EditableInput", () => {
  it("should render the input with default value", () => {
    render(<EditableInput value="test" editable={true} />);

    const textbox = screen.getByRole("textbox");
    expect(textbox).not.toBeNull();
    expect(textbox.value).toBe("test");
  });

  it("should render with value as text", () => {
    render(<EditableInput value="test" editable={false} />);

    const textbox = screen.queryByRole("textbox");
    expect(textbox).toBeNull();
    expect(screen.getByText("test")).not.toBeNull();
  });
});
