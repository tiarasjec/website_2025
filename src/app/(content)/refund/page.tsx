"use client"
import { motion } from "framer-motion"
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Header } from "@/widget/header"
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";

const Refund= [
    {
        title: "Introduction",
        description: `We offer a seamless registration process using Razorpay, a secure payment gateway. This page outlines our refund policy to provide clarity and peace of mind in case of any issues with your payment.`,
    },
    {
        title: "Payment Process",
        description: `Our payment process is designed to be easy and convenient for you. We offer multiple payment options, including credit/debit cards, net banking, and UPI. Once you select your preferred payment method, you will be redirected to Razorpay${"'"}s secure payment gateway to complete the payment process.`,
    },
    {
        title: "Refund Policy",
        description: `We understand that sometimes processing errors or technical glitches can occur during the payment process, leading to an unsuccessful transaction. In such cases, the amount paid by you will be credited back to your account automatically within 5-7 business days. Please note that this refund is only applicable in the case of an unsuccessful transaction due to processing errors and not for any other reasons. Please fill out the form : <a href='https://forms.gle/wU6fomGC7zXmB4jq9'>here</a>`,
    },
    {
        title: "Non-Refundable Services",
        description:`Please note that our registration services are non-refundable and cannot be canceled once payment has been made. This policy is in place to ensure that we can deliver the best possible experience for all our customers.`,
    },
    {
        title: "Payment Security",
        description: `We take the safety and security of your payment information very seriously. Our payment gateway partner, Razorpay, ensures that all transactions are secure and protected by industry-standard encryption. You can be confident that your payment information is safe when you use our website for registration. `,
    },
    {
        title: "Contact Information",
        description: `If you have any questions or concerns about our refund policy or payment process, please do not hesitate to contact our team. You can reach us at <a href="mailto:tiara@sjec.ac.in">tiara@sjec.ac.in</a>, and we will be happy to assist you.            `,
    },

];


// Define the component with props
export default function AboutTiara({ title = "Refund", sections = Refund }) {
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
                {section.title && <h1 className="text-2xl">{section.title}</h1>}
                <p
  dangerouslySetInnerHTML={{
    __html: section.description.replace(
      /<a /g,
      '<a style="color: #3b82f6; text-decoration: underline;" '
    ),
  }}
/>

              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}