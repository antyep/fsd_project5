import BootstrapModal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import "./Modal.css";

export const Modal = ({
  title,
  message,
  show,
  handleClose,
  handleConfirm,
  handleCancel,
  confirmText,
}) => {
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
        <div className="modal-buttons">
          {handleCancel && (
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          )}
          <button
            className="ok-button"
            onClick={handleConfirm ? handleConfirm : handleClose}
          >
            {confirmText ? confirmText : "Ok"}
          </button>
        </div>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  show: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  confirmText: PropTypes.string,
};
