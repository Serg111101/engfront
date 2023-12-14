import React, { useState } from 'react'
import './AddClassModal.scss'
import { CloseOutlined } from '@ant-design/icons'

export const AddClassModal = ({ setAddClassModal, addClass }) => {
    const [addValue, setAddValue] = useState('')
    const [error, setError] = useState(false)
    return (
        <div className='AddClassModal'>
            <div className='AddClassDiv'>
            <CloseOutlined className=' CloseModal' onClick={()=>{setAddClassModal(false)}} />
                <form action="" onSubmit={(e) => { e.preventDefault(); addClass(addValue, setError) }}>
                    <h3>Դասարանի անունը</h3>
                    <input className={error && "errorInput"} type="text" maxLength={7} placeholder='Դասարանի անունը' value={addValue} onChange={(e) => { setAddValue(e.target.value); setError(false) }} />
                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}

                    <button onClick={(e) => { e.preventDefault(); addClass(addValue, setError) }}>Ավելացնել</button>
                </form>
            </div>
        </div>
    )
}

