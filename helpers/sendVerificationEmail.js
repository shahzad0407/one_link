import VerificationEmail from '@/email-template/sendVerificationEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail  (email,username,verifyCode) {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'OneLink | Verification Code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
    } catch (error) {
        console.log(error)
        console.log("Error sending Verification Email",error)
    }
}