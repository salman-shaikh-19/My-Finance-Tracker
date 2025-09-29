import React, { useRef } from "react";
import { CgClose } from "react-icons/cg";

const CommonModal = ({
  modalId = "defModalId",
  children,
  openModalBtnText = "Open Modal",
  openModalBtnClassName=''
}) => {
  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleBackdropClick = (e) => {
    // close only if click is outside modal-box
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <>
      <button className={`btn ${openModalBtnClassName}`} onClick={() => modalRef.current?.showModal()}>
        {openModalBtnText}
      </button>

      <dialog
        ref={modalRef}
        id={modalId}
        className="modal"
        onClick={handleBackdropClick}
      >
        <div className="modal-box relative">
          <button
            className="hover:cursor-pointer absolute right-2 top-2"
            onClick={closeModal}
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
