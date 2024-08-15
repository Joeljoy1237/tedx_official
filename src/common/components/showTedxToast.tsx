// utils/showToast.tsx
import { toast } from 'react-hot-toast';
import TedxToast from './TedxToast';
import { useEffect } from 'react';

interface ToastOptions {
  type: 'success' | 'error' | 'info';
  message: string;
  desc?:string
}

const showTedxToast = ({ type, message,desc }: ToastOptions) => {
  toast.custom((t) => (
    <TedxToast type={type} message={message} toastId={t.id} desc={desc} />
  ));
};

export default showTedxToast;
