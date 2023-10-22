import SidebarOption from './SidebarOption';
import { IOption } from '../../types/interfaces';

interface SidebarProps {
  options: IOption[];
  selectedOptionIndex: number;
  onSelectOption: (index: number) => void
  onResetOptions : () => void
}

const Sidebar = ({ 
  options, 
  selectedOptionIndex, 
  onSelectOption, 
  onResetOptions 
}: SidebarProps) => {
  return (
    <div className="sidebar">
      {options.map((option, index) => {
        const { name } = option; 

        return (
          <SidebarOption
            key={index}
            isActive={index === selectedOptionIndex}
            name={name}
            onClickOption={() => { onSelectOption(index) }}
          />
        )
      })}
      <button
        className='sidebar-option' 
        type='reset'
        onClick={onResetOptions}
      > Reset 
      </button>
  </div>
  )
};

export default Sidebar;