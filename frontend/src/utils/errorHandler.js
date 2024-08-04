import { toast } from 'react-toastify';

/**
 * Handle errors and display toast notifications.
 * @param {Error} error - The error object.
 * @param {string} toastMessage - The message to display in the toast notification. 
 * If not provided, defaults to 'Oops, something happened. Please try again later.'
 */
export function handleError(error, toastMessage = 'Oops, something went wrong. Please try again later.') {
    console.error('Error:', error.message);
  
    toast.error(toastMessage, {
      position: 'top-left',
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
      theme: 'colored',
    });
  }  
