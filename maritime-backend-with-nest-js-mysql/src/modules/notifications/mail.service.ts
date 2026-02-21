import { Injectable, Logger } from "@nestjs/common"
import * as nodemailer from "nodemailer"
import { Transporter } from "nodemailer"

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name)
  private readonly transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })
  }

  /**
   * Send an email. Retries once on failure and logs the error.
   * Returns true if delivered, false if both attempts fail.
   */
  async sendMail(to: string, subject: string, html: string): Promise<boolean> {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
    }

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        await this.transporter.sendMail(mailOptions)
        this.logger.log(`Email delivered to ${to} — "${subject}"`)
        return true
      } catch (error) {
        this.logger.error(
          `Email attempt ${attempt}/2 failed for ${to}: ${error.message}`,
        )
        if (attempt === 2) return false
      }
    }

    return false
  }

  async sendWelcomeEmail(to: string): Promise<boolean> {
    const subject = "Welcome to OnTime Maritime!"
    const loginUrl = `${process.env.FRONTEND_URL || "https://ontimemaritime.com"}/login`
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:0;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
        <div style="background:#1a3c5e;padding:32px 24px;text-align:center">
          <h1 style="color:#ffffff;margin:0;font-size:24px;letter-spacing:1px">ONTIME MARITIME</h1>
          <p style="color:#a8c4e0;margin:4px 0 0;font-size:13px">Tech Meet Cargo</p>
        </div>
        <div style="padding:32px 24px">
          <h2 style="color:#1a3c5e;margin-top:0">Welcome aboard! 🎉</h2>
          <p style="color:#333;line-height:1.6">
            Congratulations! Your OnTime Maritime account has been successfully created and verified.
            You now have access to our full suite of maritime operations tools.
          </p>
          <ul style="color:#555;line-height:2;padding-left:20px">
            <li>Real-time cargo &amp; vessel tracking</li>
            <li>Digital Bill of Lading (e-BOL)</li>
            <li>Auction marketplace</li>
            <li>Document management</li>
            <li>Insurance &amp; arbitration services</li>
          </ul>
          <div style="text-align:center;margin:32px 0">
            <a href="${loginUrl}"
               style="background:#1a3c5e;color:#ffffff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;display:inline-block">
              Sign In to Your Account
            </a>
          </div>
          <p style="color:#888;font-size:12px;line-height:1.6">
            If you did not create this account, please contact us immediately at
            <a href="mailto:support@ontimemaritime.com" style="color:#1a3c5e">support@ontimemaritime.com</a>.
          </p>
        </div>
        <div style="background:#f4f8fc;padding:16px 24px;text-align:center">
          <p style="color:#aaa;font-size:11px;margin:0">
            &copy; ${new Date().getFullYear()} OnTime Maritime. All rights reserved.
          </p>
        </div>
      </div>
    `
    return this.sendMail(to, subject, html)
  }

  async sendPasswordResetEmail(to: string, otpCode: string): Promise<boolean> {
    const subject = "Reset your OnTime Maritime password"
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:0;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
        <div style="background:#1a3c5e;padding:24px;text-align:center">
          <h2 style="color:#ffffff;margin:0;font-size:20px">OnTime Maritime</h2>
        </div>
        <div style="padding:32px 24px">
          <h3 style="color:#1a3c5e;margin-top:0">Password Reset Request</h3>
          <p style="color:#333;line-height:1.6">
            We received a request to reset the password for your account.
            Use the code below to complete the reset. It expires in <strong>10 minutes</strong>.
          </p>
          <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#1a3c5e;text-align:center;padding:16px;background:#f4f8fc;border-radius:6px;margin:24px 0">
            ${otpCode}
          </div>
          <p style="color:#666;font-size:13px;line-height:1.6">
            If you did not request a password reset, you can safely ignore this email.
            Your password will not be changed.
          </p>
        </div>
        <div style="background:#f4f8fc;padding:16px 24px;text-align:center">
          <p style="color:#aaa;font-size:11px;margin:0">
            &copy; ${new Date().getFullYear()} OnTime Maritime. All rights reserved.
          </p>
        </div>
      </div>
    `
    return this.sendMail(to, subject, html)
  }

  async sendOtpEmail(to: string, otpCode: string): Promise<boolean> {
    const subject = "Your OnTime Maritime verification code"
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px">
        <h2 style="color:#1a3c5e;margin-bottom:8px">OnTime Maritime</h2>
        <p style="color:#333;margin-bottom:16px">Use the code below to complete your registration. It expires in <strong>10 minutes</strong>.</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#1a3c5e;text-align:center;padding:16px;background:#f4f8fc;border-radius:6px;margin-bottom:16px">
          ${otpCode}
        </div>
        <p style="color:#666;font-size:13px">If you did not request this code, you can safely ignore this email.</p>
      </div>
    `
    return this.sendMail(to, subject, html)
  }
}
