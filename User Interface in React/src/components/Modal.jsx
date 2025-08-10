import { useRef } from "react";

export default function Modal({ closeModal, addTemplate }) {
  const message = useRef();

  function handleSave() {
    let data = message.current.value;
    addTemplate((prev) => {
      let updated = [...prev, data];
      return updated;
    });
    closeModal();
  }

  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modalPrivate">
        <h3>Create a Message</h3>
        <textarea ref={message}></textarea>
        <button onClick={closeModal}>Close</button>
        <button className="modalsave" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
}
