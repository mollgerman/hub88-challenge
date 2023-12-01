import { expect, describe, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { mock1, mock2, mock3, mock4, mock5 } from "./mocks";
import App from "../App";

describe("App", () => {
  it("should show error in UI", async () => {
    render(
      <MockedProvider mocks={mock2} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(
      await screen.findByText("ApolloError: An error occurred")
    ).toBeInTheDocument();
  });

  it("should show error in GraphQL", async () => {
    render(
      <MockedProvider mocks={mock3} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(
      await screen.findByText("ApolloError: GraphQL Error!")
    ).toBeInTheDocument();
  });

  it("should not render contries when typed incorrect code", async () => {
    render(
      <MockedProvider mocks={mock4} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const input = screen.getByPlaceholderText("Filter by country code");

    fireEvent.change(input, { target: { value: "UGD" } });
    expect(
      await screen.findByText("No countries found for code")
    ).toBeInTheDocument();
    expect(await screen.findByText("UGD")).toBeInTheDocument();
  });

  it("should render only filtered countries", async () => {
    render(
      <MockedProvider mocks={mock5} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const input = screen.getByPlaceholderText("Filter by country code");

    fireEvent.change(input, { target: { value: "A" } });
    expect(await screen.findByText("AD")).toBeInTheDocument();
    expect(await screen.findByText("AZ")).toBeInTheDocument();
  });

  it("should render without error", async () => {
    render(
      <MockedProvider mocks={mock1} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(await screen.findByText("Loading...")).toBeInTheDocument();

    const input = document.querySelector("input") as HTMLInputElement | null;
    expect(input).toBeTruthy();
    expect(input?.textContent).toBe("");
    expect(input?.type).toBe("text");

    expect(await screen.findByText("Code")).toBeInTheDocument();
  });

  it("should change input value", () => {
    render(
      <MockedProvider mocks={mock1} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const input = screen.getByPlaceholderText(
      "Filter by country code"
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "US" } });
    expect(input).toHaveValue("US");
  });
});
