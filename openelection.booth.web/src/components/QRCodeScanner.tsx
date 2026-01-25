import {useEffect} from "react";
import {useVerification} from "../contexts/VerificationContext";
import {Html5QrcodeScanner} from "html5-qrcode";

export function QRCodeScanner() {
    const {onQRCodeScanned} = useVerification();

    useEffect(() => {
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            {fps: 10, qrbox: {width: 250, height: 250}},
            /* verbose= */ false);
        html5QrcodeScanner.render(onQRCodeScanned, () => {
            alert('Scan failed, please try again.')
        });
    }, [onQRCodeScanned]);

    return (
        <div className="space-y-4">
            <div id="reader" style={{maxWidth: '100%'}}></div>
            <p className="text-sm text-center text-gray-600">
                Position your QR code in front of the camera
            </p>
        </div>
    );
}

