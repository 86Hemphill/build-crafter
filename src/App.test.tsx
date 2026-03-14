import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App routes", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows the lightweight home state before generation", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/try stacking filters for more interesting results/i)).toBeInTheDocument();
  });

  it("generates a guide preview from the expanded filters", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await user.selectOptions(screen.getByLabelText("Vibe"), "industrial");
    await user.selectOptions(screen.getByLabelText("Biome"), "mountain");
    await user.selectOptions(screen.getByLabelText("Build Goal"), "redstone");
    await user.click(screen.getByRole("button", { name: /generate build guide/i }));

    expect(screen.getByText(/fresh blueprint/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open detailed build guide/i })).toBeInTheDocument();
  });

  it("renders the not found route", () => {
    render(
      <MemoryRouter initialEntries={["/missing"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/wandered off the build grid/i)).toBeInTheDocument();
  });
});
