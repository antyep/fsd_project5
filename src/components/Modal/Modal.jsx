import BootstrapModal from "react-bootstrap/Modal";
import "./Modal.css";

export const Modal = ({ title, message, show, handleClose }) => {
  return (
    <BootstrapModal
      size="sm"
      show={show}
      aria-labelledby="example-modal-sizes-title-sm"
      onHide={handleClose}
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title id="example-modal-sizes-title-sm">
          {title}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{message}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <button className="ok-button" onClick={handleClose}>
          Ok
        </button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
