// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import './HomeAuthor.scss';
import { useSelector } from 'react-redux';

export function HomeAuthorComponent() {
  const { HomeAuthor } = useSelector((state) => state.HomeAuthor);
  const [eng,setEng]=useState(false)
  const location=window.location

  useEffect(()=>{
  setEng(location.href.includes("US"));
},[location])

  return (
    <div className="HomeAuthor">
      <div className='homeAuthorContainer'>
        <div className={eng?"homeAuthorWords engText":"homeAuthorWords"}>
          <p className='collapse' id='collapseSummary'>{HomeAuthor?.title}</p>
        </div>
        <div className='imageAuthor' >
          <img src={HomeAuthor?.image} alt={HomeAuthor?.text} />

        </div>
        <div className="authorClass">
          <p>{HomeAuthor?.text}</p>
          <div className='lineDivHomeAuthot'></div>
        </div>
      </div>
    </div>
  );
}
