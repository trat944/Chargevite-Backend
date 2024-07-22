import * as nodemailer from 'nodemailer';

export class MailService {
  private transporter: { sendMail: (arg0: { from: string; to: string; subject: string; text: string; }) => any; };

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: '"Task Manager" <no-reply@taskmanager.com>',
      to,
      subject,
      text,
    });
  }
}
