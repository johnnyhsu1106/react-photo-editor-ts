import { ReactNode, createContext, useContext, useState, useMemo } from 'react';
import { IOption, IStyle } from '../types/interfaces';
import DEFAULT_OPTIONS from '../options.json';


interface PhotoEditorProviderProps {
  children: ReactNode;
};

interface IPhotoEditorContext {
  options: IOption[];
  selectedOptionIndex: number;
  selectedOption: IOption;
  handleOptionSelect: (index: number) => void;
  handleSliderChange: (value: number) => void;
  handleOptionsReset: () => void;
  imageStyle: IStyle;
};


const PhotoEditorContext = createContext<IPhotoEditorContext | null>(null);

const usePhotoEditorContext = () => {
  const photoEditor = useContext(PhotoEditorContext);
  if (photoEditor === null) {
    throw new Error('usePhotoContext must be used within PhotoProvider')
  }
  return photoEditor;
};



const PhotoEditorProvider = ({
  children
}: PhotoEditorProviderProps) => {
  const [options, setOptions] = useState<IOption[]>(DEFAULT_OPTIONS);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  const selectedOption: IOption = options[selectedOptionIndex];

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

  const value = {
    options,
    selectedOptionIndex,
    selectedOption,
    handleOptionSelect,
    handleSliderChange,
    handleOptionsReset,
    imageStyle
  };

  return (
    <PhotoEditorContext.Provider value={value}>
      {children}
    </PhotoEditorContext.Provider>    

  )
}

export {usePhotoEditorContext, PhotoEditorProvider}
