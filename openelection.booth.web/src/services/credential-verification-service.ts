import type {VerificationMessage} from "../models/verification-status-model.ts";

export const verifyCredentials = async (hash: string): Promise<VerificationMessage> => {
    try {
        const response = await fetch('/api/verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash }),
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error verifying credentials:', error);
        throw error;
    }
}