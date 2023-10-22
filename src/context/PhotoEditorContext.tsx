import { ReactNode, createContext, useContext, useState, useMemo, CSSProperties } from 'react';
import { IOption } from '../types/interfaces';
import DEFAULT_OPTIONS from '../options.json';


interface PhotoEditorProviderProps {
  children?: ReactNode;
};

interface IPhotoEditorContext {
  imageUrl: string | ArrayBuffer | null;
  imageStyle: CSSProperties;
  options: IOption[];
  selectedOptionIndex: number;
  selectedOption: IOption;
  handleImageUpload: (file: FileList[0] | undefined) => void
  handleOptionSelect: (index: number) => void;
  handleSliderChange: (value: number) => void;
  handleOptionsReset: () => void;
};


const PhotoEditorContext = createContext<IPhotoEditorContext | null>(null);

const usePhotoEditorContext = () => {
  const photoEditor = useContext(PhotoEditorContext);
  if (photoEditor === null) {
    throw new Error('usePhotoEditorContext must be used within PhotoEditorProvider')
  }
  return photoEditor;
};


const PhotoEditorProvider = ({
  children
}: PhotoEditorProviderProps) => {
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);
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

  const handleImageUpload = (file: FileList[0] | undefined) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const imageStyle = useMemo<CSSProperties>(() => {
    const filters = options.map(option => {
      const { property, value, unit } = option;
      return `${property}(${value}${unit})`
    }).join(' ');

    return { 
      backgroundImage: `url(${imageUrl})`,
      filter: filters
    };
  }, [options, imageUrl]);

  const value = {
    imageUrl,
    imageStyle,
    options,
    selectedOptionIndex,
    selectedOption,
    handleImageUpload,
    handleOptionSelect,
    handleSliderChange,
    handleOptionsReset,
  };

  return (
    <PhotoEditorContext.Provider value={value}>
      {children}
    </PhotoEditorContext.Provider>    

  )
}

export {usePhotoEditorContext, PhotoEditorProvider}
