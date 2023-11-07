// @src/components/Modal.jsx

import React from "react";
import './Modal.css';

function Modal ({
  closeOnClick,
  setIsOpen,
  heading,
  content,
  footer
}: {
  closeOnClick: boolean,
  setIsOpen: Function,
  heading: React.ReactNode | undefined,
  content: React.ReactNode,
  footer: React.ReactNode | undefined
}) {
  return (
    <>
      <div
        role="dialog"
        aria-modal="true" 
        aria-live="assertive"
        aria-labelledby="modal-title"
        className='overlay'
        onClick={closeOnClick ? () => setIsOpen(false) : undefined}/>
      <div className='modal'>
        {
          heading ?
            <div className='modal-heading'>
              {heading}
            </div> : <></>
        }
        <div className='modal-content'>
          {content}
        </div>
        {
          footer ?
            <div className='modal-footer'>
              {footer}
            </div> : <></>
        }
      </div>
    </>
  );
};

export {
  Modal
};