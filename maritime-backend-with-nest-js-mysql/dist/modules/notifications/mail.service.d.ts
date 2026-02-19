export declare class MailService {
    private readonly logger;
    private readonly transporter;
    constructor();
    sendMail(to: string, subject: string, html: string): Promise<boolean>;
    sendOtpEmail(to: string, otpCode: string): Promise<boolean>;
}
