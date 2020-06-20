import React, { Component } from 'react'

export default class InputReadOnly extends Component {
    render() {
        const {value, label, id, color} = this.props

        return (
            <div className="calculos">
                <label>{label}
                <input
                   type="text"
                   id={id}
                   value={value}
                   readOnly
                   style={{
                     fontWeight: 'bold',
                     color: color,
                   }}
                />
                </label>
            </div>
        )
    }
}
