import React, { useState } from "react";

export default function Message({ message, editMessage, index }) {
  const [isEditing, setIsEditing] = useState(false);
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
  return (
    <div className="messageBox mb-4">
      {!isEditing && (
        <div>
          <textarea value={message} onChange={handleChange}></textarea>
          <button className="m-1">Save</button>
          <button>Cancel</button>
        </div>
      )}
    </div>
  );
}
