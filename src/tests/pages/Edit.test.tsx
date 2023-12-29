import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import MyContext from "../../context/context";
import Edit from "../../components/pages/Edit";

const mock = new MockAdapter(axios);

// Mocking the context value for MyContext
const contextValue = {
  token: "mocked-token",
};

const renderWithRouter = (component, route) => {
  window.history.pushState({}, "Test page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <MyContext.Provider value={contextValue}>
        <Route path="/edit/:selectedId?">{component}</Route>
      </MyContext.Provider>
    </MemoryRouter>
  );
};

describe("Edit Component", () => {
  beforeEach(() => {
    // Mocking the API response for showIdData
    mock.onGet("/api/get-departadmin-withid").reply(200, {
      _id: "123",
      firstname: "John",
      middlename: "Doe",
      lastname: "Smith",
      email: "john.doe@example.com",
      loginsso: false,
      username: "johndoe",
      password: "Password@123",
      repeatPassword: "Password@123",
      instructor: true,
    });
  });

  afterEach(() => {
    mock.reset();
  });

  it("renders the component and fills the form with data", async () => {
    renderWithRouter(<Edit />, "/edit/123");

    // Wait for the API call to complete
    await waitFor(() => {});

    // Check if the form is rendered and filled with data
    expect(screen.getByLabelText(/first name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/middle name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/last name/i)).toHaveValue("Smith");
    expect(screen.getByLabelText(/email/i)).toHaveValue("john.doe@example.com");
    expect(screen.getByLabelText(/user name/i)).toHaveValue("johndoe");
    expect(screen.getByLabelText(/is instructor/i)).toBeChecked();
  });
});
