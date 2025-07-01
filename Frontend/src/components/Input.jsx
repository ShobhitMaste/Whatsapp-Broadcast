import { useState } from "react";
export default function Input() {
  const [messages, setMessages] = useState([]);
  const [messageBoxes, setMessageBoxes] = useState(1);

  function handleAddMessage() {
    console.log(messageBoxes);
    setMessageBoxes((prevCount) => prevCount + 1);
  }

  function handleSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const code = formData.get('code');
    const number = formData.get('number');
    setMessages(() => {
        let updated = [];
        for(let i = 0; i < messageBoxes; i++){
            updated.push(formData.get(`message${i}`));
        }
        return updated;
    })
    console.log(messages);
  }

  return (
    <div className="flexcenter">
      <form className="flexcol" onSubmit={handleSubmit}>
        <label>Country Code - </label>
        <select name="code">
          <option>+91</option>
          <option>+81</option>
        </select>
        <label className="mt-3">Number - </label>
        <input name="number" type="number" />
        <div className="flexcenter">
          <div className="flexcol messagebox mt-3">
            {Array.from({ length: messageBoxes }).map((it, index) => {
              return (
                <li key={index} className="mb-3">
                  <label>Message {index + 1} - </label><br/>
                  <textarea name={`message${index}`}></textarea>
                </li>
              );
            })}
          </div>
          <button onClick={handleAddMessage} type="button">
            Add More Messages
          </button>
        </div>
        <button type="submit">
            Submit
        </button>
      </form>
    </div>
  );
}
