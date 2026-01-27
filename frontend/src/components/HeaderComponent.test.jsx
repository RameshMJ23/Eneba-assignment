import {beforeAll, describe, vi, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from 'axios';

import HeaderComponent from "./HeaderComponent";

describe("Header component", () => {

  let setGames;
  let user; 

  beforeAll(() => {
    vi.mock('axios');
    setGames = vi.fn();
    user = userEvent.setup();

    axios.get.mockImplementation(async () => {
      return {
        data: []
      }
    })
  });

  it('working of search bar', async () => {
    render(<HeaderComponent setGames={setGames}/>);

    const searchBar = screen.getByPlaceholderText("search");

    await user.type(searchBar, "Split");

    expect(searchBar).toHaveValue("Split");

    await user.keyboard("{Enter}");

    expect(setGames).toHaveBeenCalled();
  })
})