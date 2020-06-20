import React, { Component } from 'react'

export default class ProgressBarSalary extends Component {
    render() {
        const {value, color} = this.props
        return (
            <div
                style={{
                marginTop: "20px",
                width: value + "%",
                height: "20px",
                backgroundColor: color
                }}
            />
        )
    }
}
