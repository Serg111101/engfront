// import React, { useEffect, useState } from 'react';
import './HomeAuthor.scss';
import { useSelector } from 'react-redux';

export function HomeAuthorComponent() {
  const { HomeAuthor } = useSelector((state) => state.HomeAuthor);

  return (
    <div className="HomeAuthor">
      <div className='homeAuthorContainer'>
        <div className="homeAuthorWords">
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
