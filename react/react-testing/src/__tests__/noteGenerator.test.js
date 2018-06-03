import React from "react";
import * as axios from "axios";
import { render, Simulate, wait } from "react-testing-library";
import MockAxios from "axios-mock-adapter";
import "dom-testing-library/extend-expect";
import Note from "../note";
import NoteGenerator from "../noteGenerator";

//creates a new instance of MockAxios with a random delay
const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });

//takes and executes a callback function after running all the tests in this file, and removes the mocked state from axios
afterAll(() => {
  mock.restore();
});

//A test returns true or false
test("Note component receives props and then render text", () => {
  //Renders a component and asign it to the constant.
  const { getByTestId, getByText, container } = render(<Note text="some text" />);

  //Expect note component to render correctly. Gets the text from the node element that have the attribute 'data-testid="node-text"'
  expect(getByTestId("node-text")).toHaveTextContent("some text");

  render(<Note text="A very useful tip..." />, { container });

  // Sprawdzamy czy komponent przerenderował się z nowymi propsami
  expect(getByText("A very useful tip...")).toBeTruthy();
});

//Tests the NoteGenerator module
test("Note generator module loads a random note and renders it", async () => {
  //Mocks Axios response

  mock.onGet().replyOnce(200, {
    value: {
      note: "Some good tip"
    }
  });

  // Rendering NoteGenerator component
  const { getByText, queryByText, queryByTestId } = render(<NoteGenerator />);

  expect(
    getByText("Click the button to load a JavaScript tip!")
  ).toBeInTheDOM();

  // Simulating a button click in the browser
  Simulate.click(getByText("Load a JS tip"));

  // Checking if the default text is no longer displayed. if the test fail it will show 'TypeError: str.match is not a function', no idea why
  expect(
    queryByText("Click the button to load a JavaScript tip!")
  ).not.toBeInTheDOM();

  expect(queryByText("Loading...")).toBeInTheDOM();

  await wait(() => {
    expect(queryByText("Loading...")).not.toBeInTheDOM();
  });

  expect(queryByTestId("node-text")).toBeInTheDOM();
});
