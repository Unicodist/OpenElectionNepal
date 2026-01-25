import {useEffect, useRef, useCallback} from "react";
import {useVerification} from "../contexts/VerificationContext";
import {Html5Qrcode} from "html5-qrcode";
import {Upload} from "lucide-react";
import jsQR from "jsqr";

export function QRCodeScanner() {
    const {onQRCodeScanned} = useVerification();
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const isRunningRef = useRef(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const startScanner = useCallback(async () => {
        if (isRunningRef.current || scannerRef.current?.getState() === 2) {
            return; // Already running
        }

        if (!scannerRef.current) {
            scannerRef.current = new Html5Qrcode("reader");
        }

        const scanner = scannerRef.current;
        const config = {fps: 10, qrbox: {width: 250, height: 250}};

        try {
            await scanner.start(
                {facingMode: "environment"},
                config,
                (decodedText) => {
                    alert('QR Code scanned: ' + decodedText);
                    onQRCodeScanned(decodedText);
                },
                (errorMessage) => {
                    console.debug(`QR Code scan error: ${errorMessage}`);
                }
            );
            isRunningRef.current = true;
            console.log("QR Code scanner started successfully");
        } catch (error) {
            console.error("Failed to start QR Code scanner:", error);
            isRunningRef.current = false;
        }
    }, [onQRCodeScanned]);

    const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    alert("Failed to create canvas context");
                    return;
                }
                
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                
                if (code) {
                    onQRCodeScanned(code.data);
                } else {
                    alert("No QR code found in the selected image. Please try another image.");
                }
            };
            img.onerror = () => {
                alert("Failed to load the image. Please try another image.");
            };
            img.src = URL.createObjectURL(file);
        } catch (error) {
            console.error("Error scanning file:", error);
        }
    }, [onQRCodeScanned]);

    useEffect(() => {
        startScanner();

        return () => {
            const scanner = scannerRef.current;
            if (scanner && isRunningRef.current) {
                scanner.stop()
                    .then(() => {
                        isRunningRef.current = false;
                        console.log("QR Code scanner stopped");
                    })
                    .catch(err => {
                        console.warn("Error stopping scanner:", err);
                        isRunningRef.current = false;
                    });
            }
        }
    }, [startScanner]);

    return (
        <div className="space-y-4">
            <div id="reader" style={{maxWidth: '100%'}}></div>
            <p className="text-sm text-center text-gray-600">
                Position your QR code in front of the camera
            </p>
            
            <div className="flex flex-col gap-3">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                    <Upload className="w-4 h-4" />
                    Upload from Gallery
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>
        </div>
    );
}

