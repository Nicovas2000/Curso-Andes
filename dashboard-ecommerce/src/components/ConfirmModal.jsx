import "./ConfirmModal.css";

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>

        <div className="modal-buttons">
          <button className="btn-danger" onClick={onConfirm}>
            Eliminar
          </button>
          <button className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
