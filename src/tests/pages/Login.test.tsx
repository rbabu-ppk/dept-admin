// import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Login from "../../components/auth/Login";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  test("submits form with valid token and navigates to /dashboard", async () => {
    // Mock useNavigate to return a mock function
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const sendTokenMock = jest.fn();
    render(
      <BrowserRouter>
        <Login sendToken={sendTokenMock} />
      </BrowserRouter>
    );

    const input = screen.getByLabelText(
      "Authorization Token"
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(input, { target: { value: "validToken" } });
    fireEvent.click(submitButton);

    // Wait for asynchronous navigation to complete
    await act(async () => {});

    expect(sendTokenMock).toHaveBeenCalledWith("validToken");

    // Ensure navigation was called with the correct path
    expect(navigateMock).toHaveBeenCalledWith("/dashboard");
  });
});
