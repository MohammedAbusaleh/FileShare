import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function DragNDrop({ setFiles }) {

    const onDrop = useCallback(acceptedFiles => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
        }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className='flex h-3/6'>
            <input {...getInputProps()} />
            <label for="dropzone-file" className={`flex flex-col flex-grow items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 ${isDragActive ? 'transition-colors duration-1000 bg-red-600 animate-pulse' : 'dark:bg-gray-700 dark:border-gray-600'} dark:hover:border-gray-500 dark:hover:bg-gray-600`}>
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            {
            isDragActive ?
                <span className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Drop!</span> :
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            }
            </label>
        </div>
    )
}

export default DragNDrop
