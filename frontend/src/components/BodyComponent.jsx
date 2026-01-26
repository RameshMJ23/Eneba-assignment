import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import './BodyComponent.css';
import { fill } from '@cloudinary/url-gen/actions/resize';

function BodyComponent({games}){
  return (
    <>
      <div className='result-flex-container'>
        <div className='result-flex-container-2'>
          <p className='result-found-text'>Result found: <span className='result-count-text'>{games.length}</span></p>
        </div>
      </div>
      <div className="product-flex-grid">
        <div className="products-grid">
          {
            games.map((game) => {
              const cloudinary = new Cloudinary({
                cloud: {
                  cloudName: import.meta.env.VITE_IMG_CLOUD
                }
              });

              const gameImage = cloudinary.image(game.image_url_number).resize(
                fill().width(600).height(800)
              );
              const platformImage = cloudinary.image(game.platform_image_number);

              return (
                <div className="product-container" key={game.id} data-testid="test-product-container">
                  <div className="product-image-container">
                    <AdvancedImage className="product-image" cldImg={gameImage}/>
                    {game.cash_back && <div className="cashback-overlay">
                      <svg
                        width={30}
                        height={30}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="QrWHlF"
                        style={{ width: "auto", height: "22px", color: "rgb(31, 10, 77)"}}
                      >
                        <g clipPath="url(#clip)">
                          <path
                            d="M6.55768 14.5095C8.12445 14.8566 9.76387 14.6269 11.1749 13.8626C12.586 13.0983 13.674 11.8506 14.2392 10.3487C14.8044 8.84672 14.8088 7.1913 14.2517 5.68633C13.6946 4.18137 12.6134 2.92785 11.2065 2.15593C9.79954 1.384 8.1614 1.14548 6.59277 1.48414C5.02415 1.8228 3.6303 2.71594 2.66718 3.99953C1.70407 5.28313 1.23625 6.87109 1.34969 8.47182C1.46308 10.0726 2.15012 11.5787 3.28463 12.7137L4.37371 13.8028M1.47198 13.8013H4.37233V10.901"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 5.33398V8.00065V10.6673"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.33301 8H10.6663"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className='overlay-cash-back-text'>CASHBACK</span>
                    </div>}

                    <div className="platform-overlay">
                      <AdvancedImage className="platfrom-image" cldImg={platformImage}/>
                      <span className='platform-text'>{game.platform}</span>
                    </div>
                  </div>

                  <div className="game-info-container" data-testid="test-game-info-container">
                    <div className="product-name">
                      {game.name}
                    </div>

                    <div className={game.can_be_activated ? "game-location": "game-location-red"} data-testid="location">
                      {game.location}
                    </div>

                    <div className="discount-container">
                      <span className="from-text">From</span>
                      {game.discount_price && 
                        <div className='discount-info-container'>
                          <span className="original-price-text">€{game.price}</span>
                          <span className="discount-text">- {game.discount_percent}%</span>
                        </div>
                      }
                    </div>

                    <div className="product-price">
                      €{game.discount_price ? game.discount_price : game.price}
                      <span className="price-info-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                          color='grey'
                          style={{ maxWidth: "25px", minWidth: "25px", height: "25px" }}>
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.69 6.13c0-.25.2-.44.43-.44h.44a.88.88 0 0 1 .88.87v2.19a.44.44 0 0 0 .43.44h.44a.44.44 0 0 1 0 .87h-.44a1.31 1.31 0 0 1-1.3-1.31V6.56h-.45a.44.44 0 0 1-.43-.43ZM6.42 3.61a.66.66 0 1 1 .73 1.1.66.66 0 0 1-.73-1.1Zm.44.75a.22.22 0 1 0-.16-.4.22.22 0 0 0 .16.4Z"
                          />
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.05 2.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9ZM7 .88a6.13 6.13 0 1 0 0 12.25A6.13 6.13 0 0 0 7 .87Z"
                          />
                        </svg>
                      </span>
                    </div>

                    { game.cash_back
                      ?(<div className="cash-back-text">
                          Cashback: €{game.cash_back}
                        </div>
                      )
                      : <div className="cashback-spacer"></div>
                    }

                    <div className="favorites">
                      <span className="favorite-content">
                        <svg
                          viewBox="0 0 24 24"
                          width="25"
                          height="25"
                          xmlns="http://www.w3.org/2000/svg"
                          strokeWidth={1.5}
                          fill="none"
                          stroke="currentColor"
                          color='white'
                        >
                          <path
                            d="M12,21.844l-9.588-10A5.672,5.672,0,0,1,1.349,5.293a5.673,5.673,0,0,1,9.085-1.474L12,5.384l1.566-1.565a5.673,5.673,0,0,1,9.085,1.474a5.673,5.673,0,0,1-1.062,6.548Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="favorite-count">{(game.favourites)}</span>
                      </span>
                    </div>

                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default BodyComponent;
