// import React from 'react'
import "./ContactUsInfo.scss"
import { useSelector } from 'react-redux'

export function ContactUsInfo() {

    // const { HomeAuthor } = useSelector((state) => state.HomeAuthor); 
    const {ContactUs} = useSelector((state)=>state?.ContactUs)
    //  const Background = ContactUs?.[0]?.image;


      
      

    return (




        <div className='ContactUsInfo'>
            <div className='ContactUsInfoContainer'>
                <p className='contactUsInfoParagraph' >{ContactUs[0]?.title}</p>
                <p className='contactUsInfoParagraphText'>
                {ContactUs[0]?.text}
                </p>
            </div>


        </div>

    )
}
