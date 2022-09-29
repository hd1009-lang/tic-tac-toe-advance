import React, { ReactNode } from 'react';
interface Props {
  children: ReactNode;
}
const Notification = ({ children }: Props) => {
  return (
    <div className='notification'>
      <div className='box-text'>{children}</div>
    </div>
  );
};

export default Notification;
