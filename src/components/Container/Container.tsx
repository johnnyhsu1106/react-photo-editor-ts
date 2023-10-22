import { ReactNode, CSSProperties } from 'react';


interface ContainerProps {
  className: string;
  style?: CSSProperties;
  children?: ReactNode;
};

const Container = ({
  className='',
  style={},
  children,
}: ContainerProps) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
};

export default Container;
