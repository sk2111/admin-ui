import React from "react";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "redux/store";
import App from "./App";

describe("App", () => {
  it("Should render the app", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText(/admin ui/i)).toBeInTheDocument();
  });
});
