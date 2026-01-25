export type VerificationMessage = {
    isVerified: true,
    voterId: string,
    name: string
} |
    {
        isVerified: false,
        error?: string
    }