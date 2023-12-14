import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './ClassItem.scss'
import { DeleteOutlined, EditOutlined, FolderViewOutlined } from '@ant-design/icons'
import { AddChildModal } from '../../components/ClassRoom/AddChildModal/AddChildModal'
import { EditChildModal } from '../../components/ClassRoom/EditChildModal/EditChildModal'

export const ClassItem = () => {
    const { name } = useParams()
    const [childArray, setChildArray] = useState([
        {
            id: 1,
            fullname: 'Sergey Abrahamyan',
            picture: "/image/gif1.gif",
            number: 1,
            level: 1,
            classnumber: name,
            ticherId: 1,
            login: "user1",
            password: 'nlkjhkgjgvhf'
        },
        {
            id: 2,
            fullname: 'Armen Knyazyan',
            picture: "/image/gif3.gif",
            number: 2,
            level: 3,
            classnumber: name,
            ticherId: 1,
            login: "user2",
            password: 'nlkjhkgjgvhf'
        }
    ])

    const [addChild, setAddChild] = useState(false)
    const [editChild, setEditChild] = useState(false)

    function saveChild(child, setError) {
        console.log(child, 'child');
    }
    function EditChild(child, setError) {
        console.log(child, 'child');
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
                                childArray?.map((el) => <tr>
                                    <td><img src={el.picture} alt="" /></td>
                                    <td><strong>{el.number}</strong></td>
                                    <td>{el.fullname}</td>
                                    <td>{el.level}</td>
                                    <td className=' editdelete'>
                                        <EditOutlined className='edit'  onClick={() => { setEditChild(el) }}/>
                                        <DeleteOutlined className='delete' />
                                    </td>
                                    <td><FolderViewOutlined /></td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                    <div className='addChild' onClick={() => { setAddChild(true) }}>
                        <button> Ավելացնել աշակերտ </button>
                    </div>
            </div>
            {addChild && <AddChildModal setAddChild={setAddChild} saveChild={saveChild} />}
            {editChild && <EditChildModal setEditChild={setEditChild} editChild={editChild} EditChild={EditChild} />}

        </div>
    )
}

