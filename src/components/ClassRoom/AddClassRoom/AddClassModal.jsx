/*eslint-disable*/
import React, { useState } from 'react'
import './AddClassModal.scss'
import { CloseOutlined } from '@ant-design/icons'

export const AddClassModal = ({ setAddClassModal, addClass }) => {
    const [addValue, setAddValue] = useState('')
    const [error, setError] = useState(false)
    let LocalValue;
    if (localStorage.getItem("language")) {
      let local = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
    }
    return (
        <div className='AddClassModal'>
            <div className='AddClassDiv'>
            <CloseOutlined className=' CloseModal' onClick={()=>{setAddClassModal(false)}} />
                <form autoComplete='off' onSubmit={(e) => { e.preventDefault(); addClass(addValue, setError) }}>
                    <h3>{LocalValue==="AM" ? "Դասարանի անունը":"Class name"}</h3>
                    <input className={error ? "errorInput" :""} type="text" maxLength={7} placeholder={LocalValue==="AM" ? "Դասարանի անունը":"Class name"} value={addValue} onChange={(e) => { setAddValue(e.target.value); {e.target.value.length!==0 ?  setError(false): setError(true)} }} />
                    {error && <p>{LocalValue==="AM" ? "Դաշտը չի կարող դատարկ լինել *":"Field cannot be empty *"}</p>}

                    <button onClick={(e) => { e.preventDefault(); addClass(addValue, setError) }}>{LocalValue==="AM" ? "Ավելացնել":"ADD"}</button>
                </form>
            </div>
        </div>
    )
}

