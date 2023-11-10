import { ReactNode } from 'react';
import './Modal.css';


interface IModal {
  closeOnClick: boolean,
  setIsOpen: Function,
  heading: ReactNode | undefined,
  content: ReactNode,
  footer: ReactNode | undefined
}


function Modal ({
  closeOnClick,
  setIsOpen,
  heading,
  content,
  footer
}: IModal) {
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