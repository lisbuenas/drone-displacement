import React from 'react';

interface ToastProps {
  message: string;
  toastShow:boolean;
  statusError: boolean
}

const Toast: React.FC<ToastProps> = ({ message,toastShow, statusError }) => {

  return (
    <>
      {toastShow && (
        <div className={`fixed bottom-4 right-4 ${statusError? 'bg-red-500':'bg-gray-800'} text-white px-4 py-2 rounded-md shadow`}>
          <span>{message}</span>
        </div>
      )}
    </>
  );
};

export default Toast;