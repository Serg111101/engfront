import React, { useEffect, useState } from 'react'
import './ClassPage.scss'
import { AddClassModal } from '../../components/ClassRoom/AddClassRoom/AddClassModal'
import { EditClassModal } from '../../components/ClassRoom/EditClassRoom/EditClassModal'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClass,addclass, editeClass, deleteClass } from '../../store/action/ClassAction';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';


export const ClassPage = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const {Class}=useSelector(state=>state.Class)

    useEffect(()=>{
     dispatch(getClass())
     

    },[dispatch])


    const [ClassArray,setClassArray]=useState([
     
    ])
    const [addClassModal,setAddClassModal]=useState(false)
    const [editClassModal,setEditClassModal]=useState(false)
    // const [editClass,setEditClass]=useState('')
    
  async  function addClass(newClassValue,setError){
        if(!newClassValue.trim()){
            setError(true)
        }else{
            let newClass={
            name:newClassValue
        }
        setClassArray([...ClassArray,newClass])
       await dispatch(addclass(newClass))
        await dispatch(getClass())
        setAddClassModal(false)
        }
    }
    async function EditClass(child, setError) {

        await dispatch(editeClass(child))
        await dispatch(getClass())
        setEditClassModal(false)
     }
   async function DeleteItem({ title, text, deleteItem }) {
        Swal.fire({
          title: title,
          text: text,
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Ոչ",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Այո",
        }).then((result) => {
          if (result?.isConfirmed) {
            deleteItem();
          }
        });
      }
      async function deleteItemS(id) {
        DeleteItem({
          title: "Ցանկանում եք ջնջել՞",
          text: "Ջնջելու դեպքում վերականգնել չեք կարող",
          deleteItem: () => deleteItem(id),
        });
      }
     async function deleteItem(item){
      
         await dispatch(deleteClass(item))
        await dispatch(getClass())
 
 
     }
     let LocalValue;
     if (localStorage.getItem("language")) {
       let local = localStorage.getItem("language");
       LocalValue = JSON.parse(local);
     }
  return (
    <div className='ClassPage'>
        <h1>{LocalValue === "AM" ?  "Դասարաններ" : "Classes"}</h1>
        <div className=' ClassArray' >
            {
                Class?.map((el)=><div className='ClassItemDiv'><div onClick={()=>{navigate(`/Class/${el.name}`)}} key={el.id} className='ClassItemName'>
                    <h2>{el.name}</h2>
                  
                </div>
                <div className=' editdelete'>
                                        <EditOutlined className='edit'  onClick={() => { setEditClassModal(el) }}/>
                                        <DeleteOutlined className='delete' onClick={()=>{deleteItemS(el)}} />
                   </div></div>)
            }
            <div className=' addClassItem' onClick={()=>{setAddClassModal(true)}}>
                +<h2>{LocalValue === "AM" ?  "Ավելացնել դասարան" : "ADD Classes"}</h2>
            </div>
        </div>
        {
            addClassModal&&<AddClassModal setAddClassModal={setAddClassModal} addClass={addClass}/>
        }
        {
            editClassModal&&<EditClassModal setEditClassModal={setEditClassModal} editClassModal={editClassModal} EditClass={EditClass}/>

        }
        <button className='btn' onClick={() => {navigate("/") }}> {LocalValue === "AM" ?  "Հետ" : "Prev"}</button>

    </div>
  )
}

