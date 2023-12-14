import React, { useState } from 'react'
import './ClassPage.scss'
import { AddClassModal } from '../../components/ClassRoom/AddClassRoom/AddClassModal'
import { useNavigate } from 'react-router-dom';


export const ClassPage = () => {
    const navigate = useNavigate();
    
    const [ClassArray,setClassArray]=useState([
        {
            id:1,
            name:'10բ'
        },{
            id:2,
            name:'8բ'
        },
        {
            id:3,
            name:'9'
        },
        {
            id:4,
            name:'10բ'
        },{
            id:5,
            name:'8բ'
        },
        {
            id:6,
            name:'9'
        }
    ])
    const [addClassModal,setAddClassModal]=useState(false)
    
    function addClass(newClassValue,setError){
        if(!newClassValue.trim()){
            setError(true)
        }else{
            let newClass={
            id:Math.floor(Math.random() * 9000),
            name:newClassValue
        }
        setClassArray([...ClassArray,newClass])
        setAddClassModal(false)
        }
    }

  return (
    <div className='ClassPage'>
        <h1>Դասարաններ</h1>
        <div className=' ClassArray' >
            {
                ClassArray?.map((el)=><div onClick={()=>{navigate(`/Class/${el.name}`)}} key={el.id} className='ClassItemDiv'>
                    <h2>{el.name}</h2>
                </div>)
            }
            <div className=' addClassItem' onClick={()=>{setAddClassModal(true)}}>
                +<h2>Ավելացնել դասարան</h2>
            </div>
        </div>
        {
            addClassModal&&<AddClassModal setAddClassModal={setAddClassModal} addClass={addClass}/>
        }
    </div>
  )
}

