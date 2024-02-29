import { useEffect, useState } from "react";

function Modal({ modalActive, setCategoryModal, title, ...props }) {

  useEffect(() => {
    if (modalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style = "";
    }
  }, [modalActive]);
  return modalActive ? (
    <div className="main-modal-wrapper">
      <div className="main-modal">
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button
            onClick={() => setCategoryModal(false)}
            className="modal-close-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">{props.children}</div>
      </div>
    </div>
  ) : null;
}

export default Modal;
