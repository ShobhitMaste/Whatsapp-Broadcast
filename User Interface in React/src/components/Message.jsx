import React, { useEffect, useState } from "react";

export default function Message({ message, editMessage, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showCopyText, setShowCopyText] = useState(false);
  useEffect(() => {
    if (showCopyText) {
      const timer = setTimeout(()=>{
        setShowCopyText(false);
      },1500);
      return () =>  clearTimeout(timer);
    }
  }, [showCopyText]);
  function handleChange(event) {
    console.log(event.target.value);
    let newMessage = event.target.value;
    console.log(index);
    editMessage((prev) => {
      let updated = [...prev];
      updated[index] = newMessage;
      return updated;
    });
  }
  function handleCloseButton() {
    setIsEditing(false);
  }
  function handleDelete() {
    editMessage((prev) => {
      let updated = [...prev];
      console.log(updated);
      updated.splice(index, 1);
      console.log(updated);
      return updated;
    });
  }
  function handleCopy() {
    navigator.clipboard.writeText(message).then(() => {
      setShowCopyText(true);
      console.log(showCopyText);
    });
  }
  return (
    <div className="editMessageBox mb-4">
      {isEditing && (
        <div>
          <textarea value={message} onChange={handleChange}></textarea>
          <button className="mx-2" onClick={handleCloseButton}>
            Save and Close
          </button>
        </div>
      )}
      {!isEditing && (
        <div className="MessageBox">
          <p className="m-0">{message}</p>
          <hr className="my-2"/>
          <div>
            <button onClick={handleCopy}>Copy</button>
            <button className="mx-2" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
      {showCopyText && (
        <p className="CopyMessage">Message Copied to Clipboard!</p>
      )}
    </div>
  );
}
