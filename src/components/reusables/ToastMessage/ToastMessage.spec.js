//libs
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
//component
import ToastMessage from "./ToastMessage";

describe("ToastMessage", () => {
  it("should render the toast message text", () => {
    const updateToastMessage = jest.fn();
    const message = "Invalid field value";

    render(
      <ToastMessage
        message={message}
        clearAfterMs={500}
        updateToastMessage={updateToastMessage}
      />,
    );

    expect(screen.getByText(message)).not.toBeNull();
  });

  it("should clear when the toast message text is not empty", async () => {
    const updateToastMessage = jest.fn();
    const message = "Invalid field value";

    render(
      <ToastMessage
        message={message}
        clearAfterMs={500}
        updateToastMessage={updateToastMessage}
      />,
    );

    expect(screen.getByText(message)).not.toBeNull();
    await waitFor(() => expect(updateToastMessage).toBeCalledWith(""));
  });
});
