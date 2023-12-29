import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import PageNotFound from "../../components/auth/PageNotFound";

describe("PageNotFound Component", () => {
  test("renders not found message", () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    expect(screen.getByText("Oops! Page Not Found")).toBeInTheDocument();

    expect(
      screen.getByText("The requested page does not exist.")
    ).toBeInTheDocument();
  });
  test("renders not found message", () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    const goToHomeButton = screen.getByRole("link", { name: "Go to Home" });
    expect(goToHomeButton).toBeInTheDocument();
    expect(goToHomeButton).toHaveAttribute("href", "/dashboard");
    // expect(screen.getByTitle("Oops! Page Not Found")).toBeInTheDocument();
  });
});
