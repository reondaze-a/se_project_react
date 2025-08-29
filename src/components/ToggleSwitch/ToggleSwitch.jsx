import './ToggleSwitch.css';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { useState, useContext } from 'react';



export default function ToggleSwitch() {
  const [checked, setChecked] = useState(false);
  const tempData = useContext(CurrentTemperatureUnitContext);

  

  return (
    <div className="toggle-switch">
      <label 
        className={`toggle-switch__label ${checked ? "checked" : "unchecked"}`}
        htmlFor="temperature-switch"
      >
        <input
          type="checkbox"
          id='temperature-switch'
          checked={checked}
          onChange={() => {
            setChecked(!checked); 
            tempData.handleToggleSwitchChange();
          }}
          className="toggle-switch__input"
        />
      </label>
    </div>
  );
}