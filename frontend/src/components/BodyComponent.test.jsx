import {describe, it, expect, beforeAll} from "vitest";
import {render, screen, within} from "@testing-library/react";
import BodyComponent from "./BodyComponent";
import { color } from "@cloudinary/url-gen/qualifiers/background";

describe('Body component', () => {

  let games;

  beforeAll(() => {
    games = [
      {
        name: "Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE",
        platform: "Xbox Live",
        location: "EUROPE",
        price: 49.99,
        image_url_number: "split_fiction_1_q9pxzx",
        platform_image_number: "xbox_platform_img_aautgy",
        discount_price: 35.11,
        discount_percent: 30,
        cash_back: 3.86,
        favourites: 599,
        can_be_activated: true
      },
      {
        name: "Split Fiction EA App Key (PC) GLOBAL",
        platform: "EA App",
        location: "GLOBAL",
        price: 49.99,
        image_url_number: "split_fiction_1_q9pxzx",
        platform_image_number: "ea_platform_img_plpujw",
        cash_back: 5.83,
        favourites: 775,
        can_be_activated: false
      }
    ];
  });

  it("Checks the game containers", async () => {
    render(<BodyComponent games={games}/>);

    const gameContainers = await screen.findAllByTestId("test-product-container");

    expect(gameContainers.length).toBe(2);

    const [gameInfo1, gameInfo2] = gameContainers.map(
      (container) => within(container).getByTestId("test-game-info-container")
    );

    expect(within(gameInfo1).getByText("Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE")).toBeInTheDocument();
    expect(within(gameInfo1).getByText("EUROPE")).toBeInTheDocument();
    expect(within(gameInfo1).getByText("€49.99")).toBeInTheDocument();
    expect(within(gameInfo1).getByText("599")).toBeInTheDocument();
    expect(within(gameInfo1).getByText("Cashback: €3.86")).toBeInTheDocument();
    expect(within(gameInfo1).getByText("- 30%")).toBeInTheDocument();
    expect(within(gameInfo1).getByText('EUROPE')).toHaveClass('game-location');

    expect(within(gameInfo2).getByText("Split Fiction EA App Key (PC) GLOBAL")).toBeInTheDocument();
    expect(within(gameInfo2).getByText("GLOBAL")).toBeInTheDocument();
    expect(within(gameInfo2).getByText("€49.99")).toBeInTheDocument();
    expect(within(gameInfo2).getByText("775")).toBeInTheDocument();
    expect(within(gameInfo2).getByText("Cashback: €5.83")).toBeInTheDocument();    
    expect(within(gameInfo2).getByTestId('location')).toHaveClass('game-location-red');
    expect(
      within(gameInfo2).queryByText(/%/)
    ).not.toBeInTheDocument();
  })
})
