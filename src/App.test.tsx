import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows a friendly empty state before generating", () => {
    render(<App />);

    expect(screen.getByText(/your next build plan will appear here/i)).toBeInTheDocument();
  });

  it("generates a build with selected filters", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText("Theme"), "medieval");
    await user.selectOptions(screen.getByLabelText("Size"), "big");
    await user.click(screen.getByRole("button", { name: /generate build plan/i }));

    const blueprintCard = screen.getByText(/fresh blueprint/i).closest("section");
    expect(blueprintCard).not.toBeNull();
    expect(within(blueprintCard as HTMLElement).getByText("Medieval")).toBeInTheDocument();
    expect(within(blueprintCard as HTMLElement).getByText("big")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save to favorites|saved to favorites/i })
    ).toBeInTheDocument();
  });

  it("persists saved favorites across a rerender", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole("button", { name: /generate build plan/i }));
    const blueprintCard = screen.getByText(/fresh blueprint/i).closest("section");
    const generatedTitle = within(blueprintCard as HTMLElement).getByRole("heading", {
      level: 2
    }).textContent;
    await user.click(screen.getByRole("button", { name: /save to favorites/i }));

    unmount();
    render(<App />);

    expect(screen.getByText(generatedTitle ?? "")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove favorite/i })).toBeInTheDocument();
  });
});
