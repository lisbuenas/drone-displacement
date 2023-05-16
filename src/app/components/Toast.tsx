import React, { useState } from 'react';

interface ToastProps {
  message: string;
  toastShow:boolean;
}

const Toast: React.FC<ToastProps> = ({ message,toastShow }) => {

  return (
    <>
      {toastShow && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow">
          <span>{message}</span>
        </div>
      )}
    </>
  );
};

export default Toast;