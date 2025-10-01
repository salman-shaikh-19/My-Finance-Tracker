import React from "react";
import { CgClose } from "react-icons/cg";

const CommonModal = ({
  modalId = "defModalId",
  children,
  openModalBtnText = "Open Modal",
  openModalBtnClassName='',
  ref,
}) => {
  

  const closeModal = () => {
    ref.current?.close();
  };

  const handleBackdropClick = (e) => {
      // e.resetForm();
    // close only if click is outside modal-box
    if (e.target === ref.current) {
      closeModal();
    }
  };

  return (
    <>
      <button className={`btn  btn-primary ${openModalBtnClassName}`}   onClick={(e) => {
    e.stopPropagation();
    ref.current?.showModal();
  }}>
        {openModalBtnText}
      </button>

      <dialog
      title=""
        ref={ref}
        id={modalId}
        className="modal"
        onClick={handleBackdropClick}
      >
        <div className="modal-box relative">
          <button
            className="hover:cursor-pointer absolute right-2 top-2"
            onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            
          >
            <CgClose />
          </button>

          {children}

          {/* <div className="mt-4 text-right">
            <button className="btn btn-sm" onClick={closeModal}>
              Close
            </button>
          </div> */}
        </div>
      </dialog>
    </>
  );
};

export default React.memo(CommonModal);
