import { useState } from "react";
export default function Input({inputBoxRef}) {
  const [messages, setMessages] = useState([]);
  const [messageBoxes, setMessageBoxes] = useState(1);
  const [messageStatus, setMessageStatus] = useState("Sending Message...");
  const [submitClicked, setSubmitClicked] = useState(false);

  function handleAddMessage() {
    console.log(messageBoxes);
    setMessageBoxes((prevCount) => prevCount + 1);
  }

  function handleDeleteMessage() {
    setMessageBoxes((prevCount) => (prevCount != 0 ? prevCount - 1 : 0));
  }

  async function handleSubmit(event) {
    setSubmitClicked(true);
    setMessageStatus(false);
    event.preventDefault();
    const formData = new FormData(event.target);
    let code = formData.get("code");
    let number = formData.get("number");
    let tempArray = [];
    for (let i = 0; i < messageBoxes; i++) {
      tempArray.push(formData.get(`message${i}`));
    }
    setMessages(() => {
      let updated = [];
      for (let i = 0; i < messageBoxes; i++) {
        updated.push(formData.get(`message${i}`));
      }
      return updated;
    });
    code = code.slice(1);
    number = code + number;
    console.log(code, number, tempArray);
    let response = await window.electronAPI.sendMessage({
      number,
      message: tempArray,
    });

    if (response == "sent") setMessageStatus(true);
    console.log(response);
  }

  function handleSubmitChange() {
    setSubmitClicked(false);
  }

  return (
    <div className="flexcenter flexcol mt-4">
      <div  ref={inputBoxRef} className="flexcenter width70 mainBody">
        <form
          className="flexstart flexcol forms pb-5 mb-5"
          onSubmit={handleSubmit}
        >
          <label className="mb-2">Country Code - </label>
          <select name="code">
            <option>+91</option>
            <option>+81</option>
          </select>
          <label className="mt-4 mb-2">Number - </label>
          <input
            name="number"
            type="text"
            pattern="[0-9]{10}"
            className="mb-3"
            onInput={handleSubmitChange}
            required
          />
          <div className="flexcenter width100">
            <div className="flexcol flexstart messagebox mt-3 width100">
              {Array.from({ length: messageBoxes }).map((it, index) => {
                return (
                  <li key={index} className="mb-3 width100">
                    <div className="flexspaceBetween mb-2">
                      <label className="flexcenter">
                        Message {index + 1} -{" "}
                      </label>
                    </div>

                    <textarea
                      className="width100"
                      name={`message${index}`}
                    ></textarea>
                  </li>
                );
              })}
            </div>
          </div>
          <div>
            <button type="submit" className="me-4 mb-4">
              Submit
            </button>
            <button
              onClick={handleAddMessage}
              className="me-4 mb-4"
              type="button"
            >
              Add More Messages
            </button>
            <button type="button" onClick={handleDeleteMessage}>
              Delete
            </button>
          </div>
        </form>
      </div>
      {submitClicked && !messageStatus && <p>Sending Message</p>}
      {submitClicked && messageStatus && (
        <div className="flexcenter">
          <p className="m-0 p-0 me-2">Successfully Sent</p>
          <img src="tick.png" height="25px" />
        </div>
      )}
    </div>
  );
}
