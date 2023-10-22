interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChangeSlider: (value: number) => void;  
}

const Slider = ({
  min, 
  max, 
  value, 
  onChangeSlider 
}: SliderProps) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {onChangeSlider(+e.target.value)}}
      />
    </div>
  )
}

export default Slider;