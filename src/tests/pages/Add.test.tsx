// Add.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import * as apiServices from "../../services/apiServices";
import Add from "../../components/pages/Add";

// Mock the API service to prevent actual network requests
jest.mock("../../services/apiServices");

describe("Add Component", () => {
  it("should render and submit the form", async () => {
    // Mock the API service response
    apiServices.createData.mockResolvedValue({
      /* mock response here */
    });

    render(
      <BrowserRouter>
        <Add />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/middle name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/enable sso/i)); // Assuming this checkbox is checked

    // Simulate password input only if SSO is not enabled
    if (!screen.getByLabelText(/enable sso/i).checked) {
      fireEvent.change(screen.getByLabelText(/new password/i), {
        target: { value: "password123" },
      });
      fireEvent.change(screen.getByLabelText(/repeat password/i), {
        target: { value: "password123" },
      });
    }

    fireEvent.click(screen.getByLabelText(/yes, i am an instructor/i));
    fireEvent.click(screen.getByText(/submit/i));

    // Wait for API request to complete
    await waitFor(() => {
      // Expectations for API call
      expect(apiServices.createData).toHaveBeenCalledWith(
        // Expected data based on user input
        expect.objectContaining({
          firstname: "John",
          middlename: "Doe",
          lastname: "Smith",
          email: "john@example.com",
          loginsso: true, // Assuming this checkbox is checked
          // password and repeatPassword values if SSO is not enabled
          password: "password123",
          repeatPassword: "password123",
          instructor: true,
        }),
        expect.anything() // token or other context data
      );
    });

    // Add additional expectations as needed for the success message or navigation
  });
});
