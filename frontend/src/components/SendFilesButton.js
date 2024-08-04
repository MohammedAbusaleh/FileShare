import React from 'react';

function SendFilesButton({ onClick }) {
    return (
    <div className='flex justify-center items-center'>
      <button onClick={onClick} className='w-full text-white font-bold py-2 px-4 rounded bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400'>
        Send Files
      </button>
    </div>
    );
}

export default SendFilesButton;
