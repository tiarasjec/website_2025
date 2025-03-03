import { UserRegistrationEmail } from "../../emails/UserRegistrationEmail";
import { RegistrationEmail } from "../../emails/RegistrationEmail";
import { Resend } from "resend";

interface SendEmailProps {
    amount: number;
    email: string;
    teamName: string[];
    contactNumber: string;
    name: string;
    events: string[];
    registrationLink: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function sendRegistrationEmail(data: SendEmailProps) {
    const { amount, email, teamName, contactNumber, name, events, registrationLink } = data;

    if (!ADMIN_EMAIL) {
        throw new Error("Admin email not configured");
    }

    try {
        // Send both emails concurrently for better performance
        const [userEmailResult, adminEmailResult] = await Promise.all([
            resend.emails.send({
                from: FROM_EMAIL,
                to: email,
                subject: "Welcome to Tiara 2025 - Registration Successful",
                replyTo: "tiara@sjec.ac.in",
                react: UserRegistrationEmail({
                    events,
                    name,
                    registrationLink,
                }),
            }),
            resend.emails.send({
                from: FROM_EMAIL,
                to: ADMIN_EMAIL,
                subject: `New Registration: ${name} for Tiara 2025`,
                react: RegistrationEmail({
                    amount,
                    email,
                    teamNames: teamName,
                    contactNumber,
                    name,
                    events,
                }),
            }),
        ]);
        console.log(userEmailResult, adminEmailResult);

        return {
            success: true,
            message: "Registration emails sent successfully",
        };
    } catch (error) {
        console.error("Failed to send registration emails:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to send registration emails");
    }
}
