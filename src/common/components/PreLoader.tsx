import React from 'react';

export default function PreLoader() {
  return (
    <div className='fixed inset-0 z-[1000] bg-black-100 flex items-center justify-center'>
      <div className="text-white">Loading...</div>
    </div>
  );
}
