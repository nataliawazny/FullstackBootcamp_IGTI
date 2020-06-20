import 'materialize-css/dist/css/materialize.min.css'
import React, {Component} from 'react';
import './App.css';
import InputFullSalary from './components/InputFullSalary'
import InputReadOnly from './components/InputReadOnly'
import {calculateSalaryFrom} from './helpers/salary'
import {formatMoney} from './helpers/formatHelpers'
import ProgressBarSalary from './components/ProgressBarSalary'

class App extends Component {
  constructor() {
    super()

    this.state = {
      fullSalary: 0,
      results: {},
    }
  }
  
  componentDidMount() {
    const { fullSalary } = this.state;
    this.setState({
      results: calculateSalaryFrom(fullSalary),
    });
  }

  handleInputChange = (fullSalary) => {
    this.setState({
      fullSalary,
      results: calculateSalaryFrom(fullSalary)    
    })
  }

  render() {
    const {
      fullSalary,
      results: { baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary },
    } = this.state

    const bar1 = (discountINSS / baseINSS) * 100
    const bar2 = (discountIRPF / baseINSS) * 100
    const bar3 = (netSalary / baseINSS) * 100

    return (
      <div className="App">
        <div className="react-salario">
            <h3>React Salário</h3>
        </div>
        <InputFullSalary
        value={fullSalary}
        onChange={this.handleInputChange}
        />
        <div className="calculos">
          <InputReadOnly
              id="1"
              value={formatMoney(baseINSS)}
              label="Base INSS:"
          />
          <InputReadOnly
              id="2"
              value={formatMoney(discountINSS)}
              label="Desconto INSS:"
              color="#e67e22"
          />
          <InputReadOnly
              id="3"
              value={formatMoney(baseIRPF)}
              label="Base IRPF:"
          />
          <InputReadOnly
              id="4"
              value={formatMoney(discountIRPF)}
              label="Desconto IRPF:"
              color="#c0392b"
          />
        </div>
        <div className="salario-liquido">
          <InputReadOnly
              id="5"
              value={formatMoney(netSalary)}
              label="Salário Líquido:"
              color="#16a085"
          />
        </div>
        <div
            style={{
            display: "flex",
            flexDirection: "row",
            width: "100%"
          }}>
          <ProgressBarSalary value={bar1} color="#e67e22" />
          <ProgressBarSalary value={bar2} color="#c0392b" />
          <ProgressBarSalary value={bar3} color="#16a085" />
        </div>
      </div>
    )
  }
}

export default App;
