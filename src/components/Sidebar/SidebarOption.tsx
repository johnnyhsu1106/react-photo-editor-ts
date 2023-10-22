interface SidebarOptionProps {
  name: string;
  isActive: boolean;
  onClickOption: () => void
}

const SidebarOption = ({ 
  name, 
  isActive, 
  onClickOption 
}: SidebarOptionProps) => {
  return (
    <button 
      className={`sidebar-option ${isActive ? 'active' : ''}`}
      onClick={onClickOption}
    >
      {name}
    </button>
  );
  
}

export default SidebarOption;