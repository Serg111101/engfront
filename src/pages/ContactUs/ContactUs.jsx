import React, { useEffect } from 'react'
import "./ContactUs.scss";
import { ContactUsInfo } from '../../components/ContactUsInfo/ContactUsInfo';
import {Contact} from "../../components/Contact";
import {Info} from "../../components/Info"
import { useDispatch,useSelector } from 'react-redux';
import { getFetchContactUs } from '../../store/action/ContactUsAction';
import { getfetchContact, getfetchSendMail } from '../../store/action/HomeAction';
export function ContactUs() {
    const {ContactUs} = useSelector((state)=>state?.ContactUs)

    const Background = ContactUs?.[0]?.logo;
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getFetchContactUs());
        dispatch(getfetchSendMail())

          dispatch(getfetchContact())


    },[dispatch])
  return (
    <div className='ContactUs' style={{ backgroundImage: `url(${Background})`}} >
        <div className='ComponentsCenterDiv'>
      <div className='pageContactInfoDiv1' >  <ContactUsInfo/></div>
       <div className='pageConatactDiv' > <Contact/> </div>
        <div className='pageInfoDiv'> <Info/> </div>
         </div>
    </div>
  )
}
