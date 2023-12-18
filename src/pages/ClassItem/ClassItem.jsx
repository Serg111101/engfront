import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ClassItem.scss'
import { DeleteOutlined, EditOutlined, FolderViewOutlined } from '@ant-design/icons'
import { AddChildModal } from '../../components/ClassRoom/AddChildModal/AddChildModal'
import { EditChildModal } from '../../components/ClassRoom/EditChildModal/EditChildModal'
import { addChildren, deleteChildren, editChildren, getFetchChildren } from '../../store/action/ChildrenAction'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../../hooks/AdminHooks/useAuth'
import Swal from 'sweetalert2'

export const ClassItem = () => {
    const {auth} = useAuth()
    const { name } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
  const { Children, loading } = useSelector((state) => state.Children);
useEffect(()=>{
    dispatch(getFetchChildren({id:auth?.id,name}))
},[dispatch])
let LocalValue;
if (localStorage.getItem("language")) {
  let local = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}

    const [addChild, setAddChild] = useState(false)
    const [editChild, setEditChild] = useState(false)

    async function saveChild(child, setError) {
    // console.log(child);
    // if(
    //     child.bookNumber
    //     : 
    //     44445
    //     fullName
    //     : 
    //     "asdfsdfs"
    //     login
    //     : 
    //     "l;khjgf"
    //     password
    //     : 
    //     ";klhjg")
        await dispatch(addChildren({...child,teacher_id:auth?.id,level:1,classNumber:name,role:"children"}))
        await dispatch(getFetchChildren({id:auth?.id,name}))
        setAddChild(false)
    }
 async function EditChild(child, setError) {

       await dispatch(editChildren(child))
       await dispatch(getFetchChildren({id:auth?.id,name}))
       setEditChild(false)
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
    async function deleteItem(id){     
        await dispatch(deleteChildren(id))
       await dispatch(getFetchChildren({id:auth?.id,name}))
    }

    return (
        <div className='ClassItem'>
            <div className='ClassItemDiv'>
                <h1>{name}</h1>
                <div className='ClassTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>{LocalValue==="AM"?"Նկար":"Photo"}</th>
                                <th>{LocalValue==="AM"?"Համար":"Number"}</th>
                                <th>{LocalValue==="AM"?"Անուն Ազգանուն":"First Name Last Name"}</th>
                                <th>{LocalValue==="AM"?"Մակարդակ":"Level"}</th>
                                <th>{LocalValue==="AM"?"Փոփոխել":"Edit"}</th>
                                <th>{LocalValue==="AM"?"Հարցաշար":"Questionnaire"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Children?.map((el) => <tr>
                                    <td><img src={el?.picture} alt="" /></td>
                                    <td><strong>{el?.bookNumber}</strong></td>
                                    <td>{el.fullName}</td>
                                    <td>{el.level}</td>
                                    <td className=' editdelete'>
                                        <EditOutlined className='edit'  onClick={() => { setEditChild(el) }}/>
                                        <DeleteOutlined className='delete' onClick={()=>{deleteItemS(el.id)}} />
                                    </td>
                                    <td><FolderViewOutlined onClick={()=>navigate(`/PupilExperince/${el?.id}`)} /></td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                    <div className='addChild'>
                        <button className='btn2' onClick={() => {navigate("/Class") }}> {LocalValue === "AM"?"Հետ":"Prev"} </button>
                        <button className='btn1'  onClick={() => { setAddChild(true) }}>{LocalValue === "AM"?" Ավելացնել աշակերտ":"Add a pupil"} </button>
                    </div>
            </div>
            {addChild && <AddChildModal setAddChild={setAddChild} saveChild={saveChild} />}
            {editChild && <EditChildModal setEditChild={setEditChild} editChild={editChild} EditChild={EditChild} />}

        </div>
    )
}

