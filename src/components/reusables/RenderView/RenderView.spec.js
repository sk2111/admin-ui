//libs
import React from "react";
import { render, screen } from "@testing-library/react";
//component
import RenderView from "./RenderView";

describe("RenderView", () => {
  it("should render the children when prop is true", () => {
    render(
      <RenderView renderIftrue={true}>
        <button>test</button>
      </RenderView>,
    );

    expect(screen.getByRole("button").textContent).not.toBeNull();
    expect(screen.getByRole("button").textContent).toBe("test");
  });

  it("should not render the children when prop is false", () => {
    render(
      <RenderView renderIftrue={false}>
        <button>test</button>
      </RenderView>,
    );

    expect(screen.queryByRole("button")).toBeNull();
  });
});
