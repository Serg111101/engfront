import { useState ,useEffect} from 'react';
// import React{useState} from 'react';
import './HomeHeader.scss';
import { useSelector } from 'react-redux';

export function HomeHeader() {

  const { HomeHeader } = useSelector((state) => state.HomeHeader);
  const images = HomeHeader?.logo || [];
  const interval=5000;
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
  return (
    <div className='HomeHeader'>
      <div className='HomeImageDiv'>
              <img src={images[currentImageIndex]} alt="Slideshow"  />
          <p className='homeHeaderP'>{HomeHeader.title}</p>
      </div>
    </div>
  );
}
