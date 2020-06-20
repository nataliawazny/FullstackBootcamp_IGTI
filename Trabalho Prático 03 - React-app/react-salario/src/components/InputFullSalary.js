import React, { Component } from 'react'

export default class InputFullSalary extends Component {

    handleInput = (event) => {
        const newSalary = event.target.value
        this.props.onChange(newSalary)
    }

    render() {
      const {value} = this.props

        return (
          <div className="input-field">
            <label>Salário Bruto
              <input
                placeholder="Insira seu salário..."
                type="number"
                onChange={this.handleInput}
                value={value}
              />
            </label>
          </div>
        )
    }
}
