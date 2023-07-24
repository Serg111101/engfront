import { useState, useEffect } from 'react';
// import React{useState} from 'react';
import './HomeHeader.scss';
import { useSelector } from 'react-redux';

export function HomeHeader() {

  const { HomeHeaderr } = useSelector((state) => state.HomeHeaderr);
  const images = HomeHeaderr?.logo || [];
  const interval = 5000;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images?.length, interval]);
  // const arrText=HomeHeader?.title?.split(' ')
  return (
    <div className='HomeHeader'>
      <div className='HomeImageDiv' style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
        <div className='homeHeaderP'><h1>{HomeHeaderr?.title}</h1></div>
          
        {/* <div class="homeHeaderP"> */}
          {/* <h1> */}
           {/* {arrText&&arrText.map(el=><span>{el}&nbsp;</span>)} */}
          {/* </h1> */}
        {/* </div> */}
      </div>
    </div>
  );
}
