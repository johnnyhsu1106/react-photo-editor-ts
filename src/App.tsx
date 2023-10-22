import { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Slider from './components/Slider/Slider';

import { IOption, IStyle } from './types/interfaces';
import DEFAULT_OPTIONS  from './options.json';
import './App.css';


const App = () => {
  const [options, setOptions] = useState<IOption[]>(DEFAULT_OPTIONS);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  const selectedOption = options[selectedOptionIndex];
  const slideProps = {
    min: selectedOption.range.min,
    max: selectedOption.range.max,
    value: selectedOption.value
  };

  const handleOptionSelect = (index: number): void => {
    setSelectedOptionIndex(index);
  };

  const handleSliderChange = (value: number): void => {
    setOptions((prevOptions) => {
      return prevOptions.map((prevOption, index) => {
        return index === selectedOptionIndex ? {...prevOption, value : value} : prevOption;
      });
    })
  };
  
  const handleOptionsReset = (): void => {
    setOptions(DEFAULT_OPTIONS);
  };


  const imageStyle = useMemo<IStyle>(() => {
    const filters = options.map(option => {
      const { property, value, unit } = option;
      return `${property}(${value}${unit})`
    }).join(' ');

    return { filter: filters };
  }, [options]);


  return (
    <div className="container">
      <div 
        className="main-image"
        style={imageStyle} 
      />
      <Sidebar 
        options={options}
        selectedOptionIndex={selectedOptionIndex}
        onSelectOption={handleOptionSelect}
        onResetOptions={handleOptionsReset}
      />
      <Slider 
        {...slideProps}
        onChangeSlider={handleSliderChange}
      />
    </div>
  )
}

export default App;
