import {useContext} from 'react';
import './counterSelector.css';
import { CounterContext } from '../../useContext/CounterContext';
function CounterSelector() {
    const {startIn, setStartIn} = useContext(CounterContext);

    const lessCounter = () => {
      if(startIn === 0){
        return setStartIn(0)
    }else{
      return setStartIn(startIn-11)
    }
  }
  const sumCounter = () => {
    if(startIn === 33){
      return setStartIn(33)
    }else{
      return setStartIn(startIn + 11)
    }
  }
  return (
    <div className="counterContent">
        <span className="counterSelector"onClick={lessCounter}>Anterior</span>
        <span className="counterSelector"onClick={sumCounter}>Siguiente</span>
    </div>
  )
}

export default CounterSelector;