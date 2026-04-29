export declare class MailService {
    private readonly logger;
    private readonly transporter;
    constructor();
    sendMail(to: string, subject: string, html: string): Promise<boolean>;
    sendWelcomeEmail(to: string): Promise<boolean>;
    sendPasswordResetEmail(to: string, otpCode: string): Promise<boolean>;
    sendListingApprovedEmail(to: string, listingTitle: string): Promise<boolean>;
    sendListingRejectedEmail(to: string, listingTitle: string, reason: string): Promise<boolean>;
    sendEmailVerificationLink(to: string, rawToken: string): Promise<boolean>;
    sendOtpEmail(to: string, otpCode: string): Promise<boolean>;
}
