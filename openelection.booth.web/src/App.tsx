import { CredentialsPrompt } from "./components/CredentialPrompt";
import { VotingPage } from "./components/VotingPage";
import { VerificationProvider, useVerification } from "./contexts/VerificationContext";

function AppContent() {
  const { isVerified } = useVerification();

  if (!isVerified) {
    return <CredentialsPrompt />;
  }

  return <VotingPage />;
}

export default function App() {
  return (
    <VerificationProvider>
      <AppContent />
    </VerificationProvider>
  );
}
