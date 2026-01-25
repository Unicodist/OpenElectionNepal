import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ShieldCheck, ScanLine } from "lucide-react";
import { useVerification } from "../contexts/VerificationContext";
import { QRCodeScanner } from "./QRCodeScanner";

export function CredentialsPrompt() {
  const { isScanning, isVerified, verificationError } = useVerification();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isVerified ? "bg-green-100" : "bg-indigo-100"
          }`}>
            {isScanning ? (
              <ScanLine className="w-8 h-8 text-indigo-600 animate-pulse" />
            ) : (
              <ShieldCheck className="w-8 h-8 text-green-600" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isScanning ? "Verifying Credentials..." : isVerified ? "Verification Complete" : "Please Scan Your QR Code"}
          </CardTitle>
          <CardDescription className="text-base">
            {isScanning
              ? "Please wait while we verify your credentials"
              : isVerified
              ? "Your identity has been successfully verified"
              : "Please scan your QR code to verify your credentials"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isScanning && !isVerified && (
            <QRCodeScanner />
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-blue-900">
              {isScanning ? "Verifying:" : "Verified:"}
            </p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li className={isScanning ? "opacity-50" : ""}>Valid voter ID number</li>
              <li className={isScanning ? "opacity-50" : ""}>Registered email address</li>
              <li className={isScanning ? "opacity-50" : ""}>Date of birth on record</li>
            </ul>
          </div>

          {!isScanning && isVerified && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-900">
                  <span className="font-medium">Success:</span> You are authorized to proceed to voting.
                </p>
              </div>
            </>
          )}

          {verificationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-900">
                <span className="font-medium">Error:</span> {verificationError}
              </p>
            </div>
          )}

          {!isScanning && !isVerified && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-900">
                <span className="font-medium">Note:</span> Please scan your QR code to verify your credentials.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
