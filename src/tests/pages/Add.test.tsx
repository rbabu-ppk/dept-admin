import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Add from "../../components/pages/Add";

describe("Add Component", () => {
  it("renders Add component correctly", () => {
    render(
      <BrowserRouter>
        <Add />
      </BrowserRouter>
    );

    expect(screen.getByText("Depart Admin Add Form")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(
      <BrowserRouter>
        <Add />
      </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText("First Name"), "John");
    userEvent.type(screen.getByLabelText("Middle Name"), "Doe");
    userEvent.type(screen.getByLabelText("Last Name"), "Smith");
    userEvent.type(screen.getByLabelText("Email"), "john.doe@example.com");
    userEvent.click(screen.getByLabelText("Enable SSO"));

    userEvent.type(screen.getByLabelText("New Password"), "password");
    userEvent.type(screen.getByLabelText("Repeat Password"), "password");

    userEvent.click(screen.getByLabelText("Yes, I am an instructor"));

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {});
  });

  it("displays validation errors when entering invalid data", async () => {
    render(<Add />);

    // Enter invalid data in the form
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: " " },
    });
    fireEvent.change(screen.getByLabelText(/middle name/i), {
      target: { value: " " },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: " " },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/repeat password/i), {
      target: { value: "456" },
    });

    // Submit the form
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check if validation errors are displayed
    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Middle name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 6 characters long")
    ).toBeInTheDocument();
    expect(screen.getByText("Password mismatch")).toBeInTheDocument();
  });
});
