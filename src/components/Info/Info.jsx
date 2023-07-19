import React from 'react'
import "./Info.scss"
import { useSelector } from 'react-redux'


export function Info () {
  const {Contact} = useSelector((state)=>state.Contact);

  return (
    <div className='Info'>
      <div className='info_container'>
        {Contact?.map((el,index) =>
          <div key={index} className='conta'>
            {
              el?.link?<a href={el?.link } target="_black">
                <img src={el?.logo} alt={el?.title} />
                <p>{el?.title}</p>
                <p>{el?.text}</p>
              </a>
              :
              <a href={"tel:"+el?.text} >
                <img src={el?.logo} alt={el?.title} />
                 <p>{el?.title}</p> 
                 <p>{el?.text}</p> 
              </a>
            }
            
           {/* <p>{ el?.link ? <a >{el?.text}</a>: */}
          {/* //   <a > */}
          {/* //     {el?.text} */}
          {/* // </a> */}
          {/* //  }</p> */}
          {/* //   <p > {el?.title}</p> */}
            {/* {el?.title === "Հեռախոսահամար" ? (
              <a href="tel:+37441407148">
                <img src={el?.logo} alt={el?.title} />
              </a>
            ) : el?.title === "Գտնվելու վայր" ? (
              <a
                href="https://www.google.com/maps/place/Engined+Inc/@40.1816102,44.5732223,18z/data=!4m9!1m2!2m1!1zINSxLiDVhNWr1a_VuNW11aHVtiAxNSw!3m5!1s0x406abd1625cbce61:0x4df25ed34c798505!8m2!3d40.1819306!4d44.573639!16s%2Fg%2F11spf9w8kf?entry=ttu"
                target="_black"
              >
                <img src={el?.logo} alt={el?.title} />
              </a>
            ) : (
              <img src={el?.logo} alt={el?.title} />
            )}



            {
              el?.title === "Հեռախոսահամար" ? (
                <a href="tel:+37441407148">
                  <p > {el?.title}</p>
                </a>
              ) : el?.title === "Գտնվելու վայր" ? (
                <a
                  href="https://www.google.com/maps/place/Engined+Inc/@40.1816102,44.5732223,18z/data=!4m9!1m2!2m1!1zINSxLiDVhNWr1a_VuNW11aHVtiAxNSw!3m5!1s0x406abd1625cbce61:0x4df25ed34c798505!8m2!3d40.1819306!4d44.573639!16s%2Fg%2F11spf9w8kf?entry=ttu"
                  target="_black"
                >
                  <p className='infop'>{el?.text}</p>
                </a>
              ) : <p className='infop'>{el?.text}</p>


            } */}


          

          </div>
        )}
      </div>
    </div>
  )
}

