import { ReactNode } from 'react';

interface ContainerProps {
  className: string;
  children: ReactNode;
};

const Container = ({
  className,
  children
}: ContainerProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
};

export default Container;
