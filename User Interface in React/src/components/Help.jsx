import { useState } from "react";

export default function Help() {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <div className="flexcenter">
      <div>
        {!clicked && (
          <img
            src="./questionMark.png"
            className="button"
            height="40"
            onClick={handleClick}
          />
        )}
        {clicked && (
          <div className="help flexcenter flexcol mx-5 px-5">
            <p><b><u>Undertanding the Software</u></b></p>
            <p>
              Use this Software to Broadcast Messages to many different numbers
              in just one click <b>(even unsaved numbers)</b>
            </p>
            <div className="textleft mt-2">
              <p>Coming Soon Features --</p>
              <ul >
                <li>AI Replies</li>
                <li>One Click send to Mass Numbers</li>
                <li>Manage your Business Through consumer analyzer</li>
              </ul>
            </div>
            <button onClick={handleClick}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
