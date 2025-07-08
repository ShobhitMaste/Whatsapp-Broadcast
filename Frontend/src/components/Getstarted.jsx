import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function Getstarted({ onConnect }) {
  const [launch, setLaunch] = useState(false);
  const [qrURL, setQRURL] = useState("");
  const [loadingQR, setLoadingQR] = useState(true);
  const [getStartedClicked, setGetStartedClicked] = useState(false);

  const startWhatsapp = async () => {
    setGetStartedClicked(true);
    const qrString = await window.electronAPI.createWhatsappQRcode();
    setLoadingQR(false);
    if (qrString != "1") {
      setQRURL(qrString);
      // console.log("---START QR STRING---");
      // console.log(qrString);
      // console.log("---END QR STRING---");
      // console.log("QR String Length: " + qrString.length); // Check length
      // console.log("Type of qrString: " + typeof qrString); // Check type, should be 'string'
      setQRURL(qrString);
      setLaunch(true);
      const connected = await window.electronAPI.WhatsappReady();
      setLaunch(false);
      onConnect(true);
      console.log(connected);
      if (connected) {
        console.log("successfully connected!!");
      }
    } else {
      onConnect(true);
      console.log("successfully connected!!");
    }
  };
  return (
    <>
      <div className="flexcol flexcenter">
        <button onClick={startWhatsapp}>Get Started</button>
        <br />
        {loadingQR && getStartedClicked && (
          <div>
            <p className="text">
              Fetching Data...<span className="loader"></span>
            </p>
          </div>
        )}
        {launch && (
          <QRCodeSVG value={qrURL} size={200} level="H" includeMargin={true} />
        )}
      </div>
    </>
  );
}
