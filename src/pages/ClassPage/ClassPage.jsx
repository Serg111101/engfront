import React, { useEffect, useState } from 'react'
import './ClassPage.scss'
import { AddClassModal } from '../../components/ClassRoom/AddClassRoom/AddClassModal'
import { EditClassModal } from '../../components/ClassRoom/EditClassRoom/EditClassModal'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClass,addclass, editeClass, deleteClass } from '../../store/action/ClassAction';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { Loading } from '../../components/Loading/Loading';
import useAuth from '../../hooks/AdminHooks/useAuth';


export const ClassPage = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
const {auth} = useAuth()
    const {Class}=useSelector(state=>state.Class)

    useEffect(()=>{
      if(auth?.id){
        dispatch(getClass(auth?.id))
      }
    },[dispatch,auth])


    const [ClassArray,setClassArray]=useState([])
    const [addClassModal,setAddClassModal]=useState(false)
    const [editClassModal,setEditClassModal]=useState(false)
    const [loading,setLoading]=useState(false)
    const [success,setSuccess] = useState("")
    useEffect(() => {
     
  
      if (success === 'ok') {
          Swal.fire({
              position: "center",
              icon: "success",
              title:LocalValue ==="AM"? "Տվյալները հաջողությամբ հաստատվել են": "Data has been successfully verified",
              showConfirmButton: false,
              timer: 2500
          }).then(() => {
            setSuccess("")
          });
      }
      if (success?.response?.status < 200 || success?.response?.status >= 400) {
          Swal.fire({
              position: "center",
              icon: "error",
              title:LocalValue ==="AM"? "Չհաջողվեց!!": "Failed",
              showConfirmButton: false,
              timer: 2500
          }).then(() => {
              setSuccess("")
          });
      }
  }, [success])
  async  function addClass(newClassValue,setError){
        if(!newClassValue.trim()){
            setError(true)
        }else{
          setLoading(true)
          let id= auth?.id;
            let newClass={
            name:newClassValue
        }
        setClassArray([...ClassArray,newClass])
       await dispatch(addclass(newClass,id,setSuccess))
        await dispatch(getClass(id))
        setAddClassModal(false)
        setLoading(false)
        }
    }
    async function EditClass(child, setError,) {

      if(!child?.name?.trim()){
        setError(true)
    }else{
      let id= auth?.id;
     
     console.log(child);
      await dispatch(editeClass(child,setSuccess))
      await dispatch(getClass(id))
      setEditClassModal(false)
      
      
    }
     }
   async function DeleteItem({ title, text, deleteItem }) {
        Swal.fire({
          title: title,
          text: text,
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: LocalValue ==="AM" ? "Ոչ":"No",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText:  LocalValue ==="AM" ?"Այո":"Yes",
        }).then((result) => {
          if (result?.isConfirmed) {
            deleteItem();
          }
        });
      }
      async function deleteItemS(id) {
        DeleteItem({
          title: LocalValue ==="AM" ? "Ցանկանում եք ջնջել՞" :"Do you want to delete?",
          text:  LocalValue ==="AM" ? "Ջնջելու դեպքում վերականգնել չեք կարող" :"Once deleted, you cannot restore",
          deleteItem: () => deleteItem(id),
        });
      }
     async function deleteItem(item){
      let id= auth?.id;
         await dispatch(deleteClass(id,item))
        await dispatch(getClass(id))
 
 
     }
     let LocalValue;
     if (localStorage.getItem("language")) {
       let local = localStorage.getItem("language");
       LocalValue = JSON.parse(local);
     }
  return (
    <div className='ClassPage'>
        <h1>{LocalValue === "AM" ?  "Դասարաններ" : "Classes"}</h1>
      {loading ? <Loading/> : <div className=' ClassArray' >
            {
                Class?.map((el)=><div key={el.id} className='ClassItemDiv'><div onClick={()=>{navigate(`/Class/${el.name}`)}} key={el.id} className='ClassItemName'>
                    <h2>{el.name}</h2>
                  
                </div>
                <div className=' editdelete'>
                                        <EditOutlined className='edit'  onClick={() => { setEditClassModal({...el,old_name:el.name}) }}/>
                                        <DeleteOutlined className='delete' onClick={()=>{deleteItemS(el)}} />
                   </div></div>)
            }
            <div className=' addClassItem' onClick={()=>{setAddClassModal(true)}}>
                +<h2>{LocalValue === "AM" ?  "Ավելացնել դասարան" : "ADD Classes"}</h2>
            </div>
        </div>}
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

