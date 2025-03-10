import { tiaraAssetsPrefix } from "@/lib/utils";
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface UserRegistrationEmailProps {
    events: string[];
    name?: string;
    registrationLink?: string;
    teamNames?: string[];
}

export const UserRegistrationEmail = ({
    events,
    name,
    registrationLink,
    teamNames,
}: UserRegistrationEmailProps) => {
    const previewText = `Registration Successful for Tiara 2025!`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[32px] max-w-[465px]">
                        <Section className="text-center">
                            <Img
                                src={`${tiaraAssetsPrefix}/full_logo.png`}
                                width={250}
                                alt="Tiara Logo"
                                className="mx-auto"
                            />
                        </Section>

                        <Heading className="text-black text-[28px] font-bold text-center p-0 my-[30px] mx-0">
                            Tiara 2025 Registration
                        </Heading>

                        <Heading className="text-black text-[20px] font-semibold text-center p-0 mb-[30px] mx-0">
                            You{"'"}re successfully Registered!
                        </Heading>

                        <Text className="text-black text-[14px] leading-[24px]">Hello {name ?? "User"},</Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Congratulations! You have successfully completed registration for Tiara 2025.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px] mt-4">
                            Please find below the list of events you have registered for:
                            <ul className="list-disc pl-6 mt-2">
                                {events?.map((event) => <li key={event}>{event}</li>)}
                            </ul>
                        </Text>

                        {teamNames && teamNames.length > 0 && (
                            <Text className="text-black text-[14px] leading-[24px] mt-4">
                                <strong>Team Events:</strong>
                                <ul className="list-disc pl-6 mt-2">
                                    {teamNames.map((team) => (
                                        <li key={team}>{team}</li>
                                    ))}
                                </ul>
                            </Text>
                        )}

                        <Section className="text-center my-[32px]">
                            <Button
                                className="bg-[#EB1C2C] rounded text-white text-[14px] font-semibold no-underline text-center px-6 py-3"
                                href={`${tiaraAssetsPrefix}/rulebook.pdf`}
                            >
                                Download Rulebook
                            </Button>
                        </Section>

                        <Text className="text-center text-[14px] leading-[24px] mb-4">
                            Please find below the QR code for your registration and make sure to keep it handy
                            for the event day.
                        </Text>

                        <Section className="text-center">
                            <Img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${registrationLink}`}
                                width={200}
                                height={200}
                                alt="Registration QR"
                                className="mx-auto"
                            />
                        </Section>

                        <Text className="text-black text-[14px] leading-[24px] mt-4">
                            We look forward to seeing you at the event.
                        </Text>

                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            Thanks & Regards, <br />
                            Team Tiara <br />
                            For any queries and concerns, feel free to contact us at: tiara@sjec.ac.in
                        </Text>

                        <Section className="text-center mt-6">
                            <div className="inline-flex items-center justify-center text-[12px] space-x-2">
                                <Button
                                    href="https://tiarasjec.in/privacy"
                                    className="text-[#666666] hover:text-[#EB1C2C]"
                                >
                                    Privacy Policy
                                </Button>
                                <span className="text-[#666666]">|</span>
                                <Button
                                    href="https://tiarasjec.in/refund"
                                    className="text-[#666666] hover:text-[#EB1C2C]"
                                >
                                    Refund Policy
                                </Button>
                                <span className="text-[#666666]">|</span>
                                <Button
                                    href="https://tiarasjec.in/tc"
                                    className="text-[#666666] hover:text-[#EB1C2C]"
                                >
                                    Terms and Conditions
                                </Button>
                            </div>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default UserRegistrationEmail;
