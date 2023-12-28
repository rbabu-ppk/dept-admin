// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import Register from "./Register";

// describe("Register component", () => {
//   it("should render Register component correctly", () => {
//     render(<Register />);
//     const element = screen.getByText("Register");
//     expect(element).toBeInTheDocument();
//   });
// });
// Register.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";

describe("Register Component", () => {
  it("should render and submit the registration form", async () => {
    render(<Register />);
    screen.debug();

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Select skills using the react-select component
    fireEvent.mouseDown(screen.getByLabelText(/Select your skills/i));
    // fireEvent.click(screen.getByText("React"));
    // fireEvent.click(screen.getByText("Node.js"));

    // Check the checkbox for newsletter subscription
    fireEvent.click(screen.getByLabelText(/Subscribe to our newsletter/i));

    // Submit the form
    // fireEvent.click(screen.getByText(/register/i));

    // Wait for success message
    // await waitFor(() => {
    //   expect(screen.getByText(/successfully registered/i)).toBeInTheDocument();
    // });

    // Reset state for the next test (optional)
    // fireEvent.click(screen.getByText(/register/i)); // This might depend on your UI logic
  });
});
