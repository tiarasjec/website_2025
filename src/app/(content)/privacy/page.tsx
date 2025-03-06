"use client"
import { motion } from "framer-motion"
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Header } from "@/widget/header"
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";

// Define the section interface for clarity
interface Section {
  title: string;
  description: string;
}

// Single interface for page props
interface PageProps {
  params?: any;
  searchParams?: any;
}

const privacyPolicy: Section[] = [
    {
        title: "Consent",
        description: `By registering and submitting your personal information, you are indicating your consent to the
    collection, utilization, and sharing of your data in accordance with the terms outlined in our privacy
    policy. If any aspect of this policy is not agreeable to you, we kindly request that you refrain from
    submitting your information or participating in our festival competition.`,
    },
    {
        title: "Information Collection",
        description: `We collect personally identifiable information from you when you voluntarily provide it to us
        through the festival registration form. The information we collect may include your name, email
        address, phone number, date of birth, and financial information such as credit card number and
        expiration date, debit card information and UPI ID.`,
    },
    {
        title: "Use of Information",
        description: `We will use the information collected during the registration process to communicate with you
        about festival events and services, including but not limited to sending promotional emails,
        newsletters, and event updates. You will have the option to opt-out of these communications at any
        time by contacting us using the email address or phone number provided on our website. We will
        not use your contact information for any other purpose without your explicit consent.
        We will delete all personally identifiable information collected during the registration process after 7
        days of login unless we are required by law to retain it for a longer period. This includes all data
        provided by the user, such as name, email address, phone number, date of birth and financial
        information.`,
    },
    {
        title: "Sharing of Information",
        description: `We do not sell or rent your personal information to any third party. We may share your personal
        data with partners, vendors, or service providers only as necessary to provide the services you have
        requested or authorized, such as processing payments or providing technical support. We will only
        share the minimum amount of information necessary to perform these services, and we will require
        all third parties to maintain the confidentiality and security of your data. We may also disclose your
        information if required by law or to protect our rights or the rights of others.`,
    },
    {
        title: "Third-party services",
        description: `We only allow third-party providers to collect, use, and disclose your information to the extent
        necessary for them to provide the services they offer. However, some providers may have their own
        privacy policies for purchase-related transactions, such as payment gateways and processors. It is
        recommended that you review their policies to understand how they handle your personal
        information.
        It's important to note that some providers may be located in a different jurisdiction than you or us. If
        you proceed with a transaction that involves a third-party service provider, your information may be
        subject to the laws of the jurisdiction(s) in which the provider or its facilities are located.
        Please be aware that once you leave our website or are redirected to a third-party website or
        application, this Privacy Policy and our website's Terms of Service no longer apply.`,
    },
    {
        title: "Your Control Over Information",
        description: `You have the right to access, correct, or delete your personal information at any time. You may also
        opt-out of receiving future communications from us by contacting us through the email address or
        phone number provided on our website.`,
    },
    {
        title: "Cookies",
        description: `We use cookies to maintain your session and to personalize your experience on our website. We do
        not use cookies to collect personally identifiable information or to track your activity on other
        websites.`,
    },
    {
        title: "",
        description: ``,
    },
    {
        title: "Security Measures",
        description: `Our website is secured with SSL encryption, and we use industry-standard security measures to
        protect your personal information from unauthorized access, disclosure, or misuse. We encrypt
        sensitive information, such as your name and date of birth, during transmission and storage. We
        restrict access to your data only to employees who need it to perform their job duties.`,
    },
    {
        title: "Registrations",
        description: `When you register for Tiara, we collect your contact and financial information to process your
        payment and fulfil your registration. We use this information only for billing purposes and to
        communicate with you about your registration.`,
    },
    {
        title: "Payment Processing and Security",
        description: `We offer multiple modes of payment on our website, including debit card, UPI ID, and other digital
        payment options. All payment details provided by you are encrypted and processed securely
        through our payment gateway partner, Razorpay. As mentioned earlier, your card data is not stored
        on our or Razorpay's servers, and all purchase transaction data is only used to complete your
        purchase and will not be saved.
        Our payment gateway follows the PCI-DSS standards set by the PCI Security Standards Council,
        which includes leading credit and debit card brands like Visa, Mastercard, American Express, and
        Discover, ensuring the secure handling of payment information by our store and its service
        providers.
        For more information on Razorpay's terms and conditions and their secure handling of payment
        information, please refer to their website at <a href="https://razorpay.com" className="text-blue-500">razorpay.com</a>.`,
    },
    {
        title: "Links to Other Sites",
        description: `Our website may contain links to other sites that are not owned or operated by us. We are not
        responsible for the privacy practices or description of those sites, and we encourage you to review their
        privacy policies before providing any personal information.`,
    },
    {
        title: "Changes to privacy policies",
        description: `
        We reserve the right to modify this privacy policy at any time, and we encourage you to review it
        frequently. Any changes or clarifications will take effect immediately upon being posted on our
        website. Should we make significant changes to this policy, we will notify you through our website,
        providing information on the type of information we collect, how we use it, and the circumstances
        under which we may use or disclose it.
        
        We understand the importance of safeguarding your personal information, and we are committed to
        protecting it in accordance with applicable data protection laws and regulations.
        Our privacy policy upholds our commitment to protect and responsibly use personal information in
        compliance with data protection laws.
        We value your trust and remain dedicated to ensuring the highest standards of data protection and
        privacy.
        For inquiries or clarifications on our privacy policy or personal data handling, you may reach us
        at <a href="mailto:tiara@sjec.ac.in">tiara@sjec.ac.in</a>.`,
    },
];

// Define the default function that follows Next.js App Router conventions
export default function Page(_props: PageProps) {
  const title = "Privacy Policy";
  const sections = privacyPolicy;

  return (
    <>
      <Header/>
      <ShaderVisualization />
      <section
        className="relative min-h-screen mt-10 w-full flex justify-center items-center"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className=""
              initial={{
                x: Math.random() * 100 - 50 + "%",
                y: Math.random() * 100 - 50 + "%",
                scale: 0,
                opacity: 0.1,
              }}
              animate={{
                x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
                y: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
                scale: [0.1, 0.3],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                filter: "blur(40px)",
              }}
            />
          ))}
        </div>

        <div className="container relative mx-auto px-4 mt-10 text-white">
          {/* Title */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className={cn(
                "mt-6 text-white text-4xl font-bold leading-relaxed sm:text-6xl md:text-7xl",
                tiaraFont.className
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {title}
            </motion.h2>
          </motion.div>

          {/* Content */}
          <div className="relative mx-auto max-w-4xl">
            {/* Paragraphs with staggered animation */}
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="mb-6 text-lg leading-relaxed text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + (index * 0.2), duration: 0.6 }}
              >
                {section.title && <h1 className="text-3xl mb-3 md:text-4xl">{section.title}</h1>}
                <p className="" dangerouslySetInnerHTML={{ __html: section.description.replace(/<a /g, `<a style="color: #3b82f6; text-decoration: underline;"`) }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}