import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface RegistrationEmailProps {
    amount: number;
    name: string;
    events: string[];
    email: string;
    teamNames?: string[];
    contactNumber: string;
}

export const RegistrationEmail = ({
    amount,
    events,
    name,
    email,
    teamNames,
    contactNumber,
}: RegistrationEmailProps) => {
    const previewText = `${name} has registered for Tiara 2025!`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="items-center">
                            <h2>{name} has Registered!</h2>
                        </Section>
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            <strong>{name} has successfully registered</strong>
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Please find below the list of events {name} has registered for:
                            <ul>{events?.map((event) => <li key={event}>{event}</li>)}</ul>
                        </Text>
                        <Hr />
                        <Text className="mt-2 text-black text-[14px] leading-[24px]">
                            Contact Number: {contactNumber}
                        </Text>
                        {teamNames && teamNames.length > 0 && (
                            <Text className="mt-2 text-black text-[14px] leading-[24px]">
                                Team Names: {teamNames.join(", ")}
                            </Text>
                        )}
                        <Text className="mt-2 text-black text-[14px] leading-[24px]">Email: {email}</Text>
                        <Text className="mt-2 text-black text-[14px] leading-[24px]">
                            Amount Paid:{" "}
                            {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                            }).format(amount / 100)}
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <div className="flex flex-col items-center justify-center text-[12px] space-y-2">
                            <div className="flex items-center space-x-2">
                                <Button href="https://tiarasjec.in/privacy">Privacy Policy</Button>
                                <span>|</span>
                                <Button href="https://tiarasjec.in/refund">Refund Policy</Button>
                                <span>|</span>
                                <Button href="https://tiarasjec.in/terms">Terms and Conditions</Button>
                            </div>
                        </div>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default RegistrationEmail;
