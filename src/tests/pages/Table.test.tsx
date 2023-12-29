import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import * as api from "../../services/apiServices";
import Table from "../../components/pages/Table";

jest.mock("../../services/apiServices", () => ({
  showData: jest.fn().mockResolvedValue([
    {
      _id: "1",
      firstname: "John",
      middlename: "Doe",
      lastname: "Smith",
      username: "username",
      email: "john.smith@example.com",
      lastLoggedInDate: "2023-01-01T12:00:00Z",
    },
    {
      _id: "2",
      firstname: "Jane",
      middlename: "Doe",
      lastname: "Johnson",
      username: "username",
      email: "jane.johnson@example.com",
      lastLoggedInDate: "2023-01-02T12:00:00Z",
    },
  ]),
  deleteData: jest.fn().mockResolvedValue({}),
}));

describe("Table component", () => {
  it("renders without crashing", async () => {
    render(<Table />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText("Department Admins")).toBeInTheDocument();
      expect(api.showData).toHaveBeenCalled();
    });
  });
});
