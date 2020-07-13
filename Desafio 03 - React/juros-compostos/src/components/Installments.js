import React from 'react'
import Installment from '../components/Installment'

export default function Installments({data}) {
    return (
        // <div className="row">
        //     {data.map(({id, value}) => {
        //         return <span key={id}>{value}</span>
        //     })}
        // </div>
        <div className="row">
            {data.map((item) => {
                const {id} = item
                return <Installment key={id} data={item}/>
            })}
        </div>
    )
}
