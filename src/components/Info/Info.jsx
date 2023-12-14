import React from 'react'
import "./Info.scss"
import { useSelector } from 'react-redux'

export function Info () {
  const {Contact} = useSelector((state)=>state.Contact);
  console.log(Contact);
  return (
    <div className='Info'>
      <div className='info_container'>
        {Contact?.map((el,index) =>
          <div key={index} className='conta'>
            {
              el?.link?(<a href={el?.link } target="_black">
                <img src={el?.logo} alt={el?.title} />
                <p>{el?.title}</p>
                <p>{el?.text}</p>
              </a>)
              :
              (index === 1)?

                (<a href={"tel:"+el?.text} >
                <img src={el?.logo} alt={el?.title} />
                 <p>{el?.title}</p> 
                 <p>{el?.text}</p> 
              </a>)

              :
             ( <>
                <img src={el?.logo} alt={el?.title} />
                 <p>{el?.title}</p> 
                 <p>{el?.text}</p> 
                 </>)

             }     

          </div>
        )}
      </div>
    </div>
  )
}

