import React, {createContext, useContext, useState, useCallback, useEffect} from "react";

interface VerificationContextType {
    isVerified: boolean;
    isScanning: boolean;
    verificationError: string | null;
    setVerified: (verified: boolean) => void;
    setScanning: (scanning: boolean) => void;
    setVerificationError: (error: string | null) => void;
    onQRCodeScanned: (qrData: string) => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function VerificationProvider({children}: { children: React.ReactNode }) {
    const [isVerified, setIsVerified] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);

    const handleSetVerified = useCallback((verified: boolean) => {
        setIsVerified(verified);
    }, []);

    const handleSetScanning = useCallback((scanning: boolean) => {
        setIsScanning(scanning);
    }, []);

    const handleSetVerificationError = useCallback((error: string | null) => {
        setVerificationError(error);
    }, []);

    const handleOnQRCodeScanned = useCallback((qrData: string) => {
        setIsScanning(true);
        // TODO: Implement QR code verification API call
        console.log("QR Code scanned:", qrData);
    }, []);

    // TODO: Add 
    useEffect(() => {
        
    }, []);

    return (
        <VerificationContext.Provider
            value={{
                isVerified,
                isScanning,
                verificationError,
                setVerified: handleSetVerified,
                setScanning: handleSetScanning,
                setVerificationError: handleSetVerificationError,
                onQRCodeScanned: handleOnQRCodeScanned,
            }}
        >
            {children}
        </VerificationContext.Provider>
    );
}

export function useVerification() {
    const context = useContext(VerificationContext);
    if (context === undefined) {
        throw new Error("useVerification must be used within a VerificationProvider");
    }
    return context;
}
