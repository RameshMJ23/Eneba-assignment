import { useState } from 'react';
import axios from 'axios';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

import EnebaLogo from '../assets/eneba-logo.svg';
import Flag from '../assets/flag.png';
import './HeaderComponent.css'

function HeaderComponent({setGames}){

  const [searchText, setSearchText] = useState("");

  function onSearchChange(event){
    setSearchText(event.target.value);
  }

  function removeSearch(){
    setSearchText('');
  }

  function searchGame(event){
    if(event.key == "Enter"){
      fetchGames();
    }
  }

  async function fetchGames(){
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/list?search=${searchText}`
    );

    setGames(response.data);
  }

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_IMG_CLOUD
    }
  });

  const profileImage = cloudinary.image("profile-image_yj2s5t");
  
  return (
    <div className='header-flex-container'>
      <div className='header-container'>
        <div className='left-container'>
          <img className='logo' src={EnebaLogo}/>
        </div>
        <div className='center-container'>
          <span className='search-icon'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 16 16"
              fill="white"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
          <input 
            className="search-bar"
            placeholder='search' 
            onChange={onSearchChange} 
            value={searchText} 
            onKeyDown={searchGame}
            data-testid="searchbar"
          />
          <button className='close-icon-button' onClick={removeSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 14 14"
              style={{ maxWidth: "20px", minWidth: "20px", height: "auto", background: "rgba(0,0,0,0)" }}
            >
              <path
                fill="white"
                fillRule="evenodd"
                d="M14 1.67L12.59.31 7 5.69 1.41.31 0 1.67l5.59 5.37L0 12.42l1.41 1.36L7 8.4l5.59 5.38L14 12.42 8.41 7.04z"
              />
            </svg>
          </button>
        </div>
        <div className='right-container'>
          <div className='right-container-1'>
            <img src={Flag} className='flag-img'/>
            <span className='language-text'>English EU | EUR </span>
          </div>
          <div className='right-container-2'>
            <svg
              viewBox="0 0 24 24"
              color='white'
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth={1.5}
              style={{ maxWidth: "35px", minWidth: "35px", height: "auto", margin: "0px 8px" }}
            >
              <path
                d="M12,21.844l-9.588-10A5.672,5.672,0,0,1,1.349,5.293h0a5.673,5.673,0,0,1,9.085-1.474L12,5.384l1.566-1.565a5.673,5.673,0,0,1,9.085,1.474h0a5.673,5.673,0,0,1-1.062,6.548Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 16 16"
              color='white'
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{maxWidth: "35px", minWidth: "35px", height: "auto", margin:"0px 8px" }}
            >
              <path
                d="M12 12.7499H5.386C5.1498 12.75 4.9212 12.6664 4.74067 12.5139C4.5602 12.3615 4.43953 12.1502 4.4 11.9173L2.642 1.58395C2.60233 1.35119 2.4816 1.13996 2.30113 0.987686C2.12067 0.835406 1.89213 0.7519 1.656 0.751953H1"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.75 14.75C10.8881 14.75 11 14.6381 11 14.5C11 14.3619 10.8881 14.25 10.75 14.25"
                stroke="currentColor"
              />
              <path
                d="M10.75 14.75C10.6119 14.75 10.5 14.6381 10.5 14.5C10.5 14.3619 10.6119 14.25 10.75 14.25"
                stroke="currentColor"
              />
              <path
                d="M5.75 14.75C5.88807 14.75 6 14.6381 6 14.5C6 14.3619 5.88807 14.25 5.75 14.25"
                stroke="currentColor"
              />
              <path
                d="M5.75 14.75C5.61193 14.75 5.5 14.6381 5.5 14.5C5.5 14.3619 5.61193 14.25 5.75 14.25"
                stroke="currentColor"
              />
              <path
                d="M4.03141 9.75007H12.0787C12.5247 9.75001 12.9578 9.60094 13.3093 9.32647C13.6608 9.05207 13.9105 8.66801 14.0187 8.23541L14.9854 4.36873C15.0038 4.29499 15.0052 4.21802 14.9895 4.14366C14.9737 4.0693 14.9412 3.99952 14.8944 3.93961C14.8476 3.87971 14.7878 3.83126 14.7194 3.79795C14.6511 3.76465 14.5761 3.74736 14.5001 3.7474H3.01075"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className='profile-photo-container'>
              <AdvancedImage cldImg={profileImage} className="profile-photo"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default HeaderComponent;

