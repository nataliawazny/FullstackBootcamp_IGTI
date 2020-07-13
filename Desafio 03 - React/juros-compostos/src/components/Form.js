import React from 'react'

export default function Form({data, onChangeData}) {
    const {initialValue, monthlyInterest, monthlyPeriod} = data

    const handleChangeInitialValue = (event) => {
        onChangeData(event.target.value, null, null)
    }

    const handleChangeMonthlyInterest = (event) => {
        onChangeData(null, event.target.value, null)
    }

    const handleChangeMonthlyPeriod = (event) => {
        onChangeData(null, null, event.target.value)
    }

    return (
        <div className="center row">

            <div className="col input-field s6 m4 l3">
                <input id="inputInitialValue" type="number" value={initialValue} min="100" step="100" onChange={handleChangeInitialValue}></input>
                <label htmlFor="inputInitialValue" className="active">Montante Inicial:</label>
            </div>

            <div className="col input-field s6 m4 l3">
                <input id="inputMonthlyInterest" type="number" value={monthlyInterest} min="-12" max="12" step="0.1" onChange={handleChangeMonthlyInterest}></input>
                <label htmlFor="inputMonthlyInterest" className="active">Taxa de Juros Mensal:</label>
            </div>

            <div className="col input-field s6 m4 l3">
                <input id="inputMonthlyPeriod" type="number" value={monthlyPeriod} min="1" max="36" step="1" onChange={handleChangeMonthlyPeriod}></input>
                <label htmlFor="inputMonthlyPeriod" className="active">Quantidade de Períodos:</label>
            </div>

        </div>
    )
}
