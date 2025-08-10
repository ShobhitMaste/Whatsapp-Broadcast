import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function Template() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addingTemplate, setAddingTemplate] = useState(false);
  const [templates, setTemplates] = useState([]);
  console.log(templates);
  useEffect(() => {}, []);

  function handleAddClick() {
    // setAddingTemplate(true);
    setAddingTemplate((prev) => !prev);
  }

  function handleSideBarButton() {
    setSidebarOpen((prev) => !prev);
  }
  return (
    <div>
      {!sidebarOpen && (
        <svg
          onClick={handleSideBarButton}
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          fill="currentColor"
          className="bi bi-layout-sidebar-inset sidebaricon"
          viewBox="0 0 16 16"
        >
          <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" />
          <path d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
        </svg>
      )}
      {sidebarOpen && (
        <div className="template">
          <h3>Templates</h3>
          <div className="addTemplate">
            <button onClick={handleAddClick}>Add</button>
            <button onClick={handleSideBarButton}>Close</button>
          </div>
        </div>
      )}
      {addingTemplate && (
        <Modal addTemplate={setTemplates} closeModal={handleAddClick} />
      )}
    </div>
  );
}
