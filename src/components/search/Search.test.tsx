import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => ({
    users: [],
    selectedUser: null,
    loading: false,
    hasError: false,
  })),
}));

describe("Search component", () => {
  let container: any = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  it("renders the Search component", () => {
    render(<Search value="" updateText={jest.fn()} />);
    const search = screen.getByTestId("SearchComponent-wrapper");
    expect(search).toBeInTheDocument();
  });

  it("should render input element with placeholder text:'Search'", () => {
    render(<Search value="" updateText={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();
  });

  it("should handle 'updateText' after input onChange", () => {
    const updateText = jest.fn();
    render(<Search value="" updateText={updateText} />);
    const searchInput = screen.getByTestId("SearchComponent-input");
    fireEvent.change(searchInput, { target: { value: "new value" } });
    expect(updateText).toHaveBeenCalledWith("new value");
  });

  it("should set props initial value into input element", () => {
    const propValue = "initial value";
    const updateText = jest.fn();
    render(<Search value={propValue} updateText={updateText} />);
    const searchInput = screen.getByTestId("SearchComponent-input");
    expect(searchInput).toHaveValue(propValue);
  });

  it("should update input value with updated props", () => {
    const initialPropValue = "initial value";
    const updatedValue = "updated value";
    const updateText = jest.fn();
    const { rerender } = render(
      <Search value={initialPropValue} updateText={updateText} />
    );
    rerender(<Search value={updatedValue} updateText={updateText} />);
    const searchInput = screen.getByTestId("SearchComponent-input");
    fireEvent.change(searchInput, { target: { value: updatedValue } });
    expect(searchInput).toHaveValue(updatedValue);
  });
});
