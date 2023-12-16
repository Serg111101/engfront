import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ClassItem.scss'
import { DeleteOutlined, EditOutlined, FolderViewOutlined } from '@ant-design/icons'
import { AddChildModal } from '../../components/ClassRoom/AddChildModal/AddChildModal'
import { EditChildModal } from '../../components/ClassRoom/EditChildModal/EditChildModal'
import { addChildren, deleteChildren, editChildren, getFetchChildren } from '../../store/action/ChildrenAction'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../../hooks/AdminHooks/useAuth'

export const ClassItem = () => {
    const {auth} = useAuth()
    const { name } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
  const { Children, loading } = useSelector((state) => state.Children);
useEffect(()=>{
    dispatch(getFetchChildren({id:auth?.id,name}))
},[dispatch])
 

    const [addChild, setAddChild] = useState(false)
    const [editChild, setEditChild] = useState(false)

    async function saveChild(child, setError) {
        await dispatch(addChildren({...child,teacher_id:auth?.id,level:1,classNumber:name,role:"children"}))
        await dispatch(getFetchChildren({id:auth?.id,name}))
        setAddChild(false)
    }
 async function EditChild(child, setError) {

       await dispatch(editChildren(child))
       await dispatch(getFetchChildren({id:auth?.id,name}))
       setEditChild(false)
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
                                <th>Նկար</th>
                                <th>Համար</th>
                                <th>Անուն Ազգանուն</th>
                                <th>Մակարդակ</th>
                                <th>Փոփոխել</th>
                                <th>Հարցաշար</th>
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
                                        <DeleteOutlined className='delete' onClick={()=>{deleteItem(el.id)}} />
                                    </td>
                                    <td><FolderViewOutlined onClick={()=>navigate(`/PupilExperince/${el?.id}`)} /></td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                    <div className='addChild'>
                        <button className='btn2' onClick={() => {navigate("/Class") }}> Հետ </button>
                        <button className='btn1'  onClick={() => { setAddChild(true) }}> Ավելացնել աշակերտ </button>
                    </div>
            </div>
            {addChild && <AddChildModal setAddChild={setAddChild} saveChild={saveChild} />}
            {editChild && <EditChildModal setEditChild={setEditChild} editChild={editChild} EditChild={EditChild} />}

        </div>
    )
}

