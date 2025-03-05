"use client"
import { motion } from "framer-motion"
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Header } from "@/widget/header"
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";

const tc= [ {
    title: "OVERVIEW",
    description: `This website is operated by St. Joseph Engineering College, Vamanjoor. Throughout the site, the terms “we”, “us” and “our” refer to St. Joseph Engineering College. St. Joseph Engineering College offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
    By visiting our site and/or participating in our college fest TIARA , you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including, without limitation, students, college staff, and all other participants who browse the page.
    Please read these Terms of Service carefully before accessing or participating in TIARA . By accessing or participating in any part of the event, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not participate in the event. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
    Any new features or tools which are added to the event shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website or by notifying you via email. It is your responsibility to check your email and our website periodically for changes. Your continued participation in the event following the posting of any changes or after being notified of such changes via email constitutes acceptance of those changes.
    `,
},
{
    title: "SECTION 1 - TIARA PARTICIPATION TERMS",
    description: `You may not use our event platform for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
    You must not engage in any behaviour that is harmful or disruptive to the event or its participants, including but not limited to transmitting any worms or viruses or any code of a destructive nature.
    A breach or violation of any of the Terms will result in immediate disqualification from the event and may lead to further consequences as deemed necessary by St. Joseph Engineering College.
    `,
},
{
    title: "SECTION 2 - GENERAL CONDITIONS FOR TIARA PARTICIPATION",
    description: `We reserve the right to refuse participation to anyone for any reason at any time, including but not limited to those who violate the terms and conditions stated in Section 1.
    You understand that any content you provide on our event platform, including but not limited to text, images, and videos, may be publicly visible to other participants and may be used by St. Joseph Engineering College for promotional purposes.
    You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the event or its contents, use of the event, or access to the event or any contact information of other participants without express written permission by us or the respective participant.
    The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
    `,
},
{
    title: "SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION FOR TIARA PARTICIPATION            ",
    description: `We, the student organizers, and college staff of St. Joseph Engineering College, strive to ensure that all information provided on the TIARA event platform is accurate, complete, and timely. However, we cannot guarantee the accuracy, completeness, or timeliness of all information provided.
    The content and material provided on the event platform are for general information purposes only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information. Any reliance on the material on this platform is at your own risk.
    This platform may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this platform at any time, but we have no obligation to update any information on the platform. You agree that it is your responsibility to monitor changes to the platform.
    `,
},
{
    title: "SECTION 4 - MODIFICATIONS TO TIARA AND REGISTRATION PRICES            ",
    description: `Prices for registration and events at TIARA , organized by St. Joseph Engineering College student organizers, are subject to change without notice.
    We reserve the right at any time to modify or discontinue any aspect of TIARA (or any part or content thereof) without notice at any time.
    St. Joseph Engineering College student organizers and college staff shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of TIARA .
    `,
},
{
    title: "SECTION 5 - EVENTS AND SERVICES AT TIARA",
    description: `Certain events and services may be available exclusively through the TIARA website, organized by St. Joseph Engineering College student organizers. These events and services may have limited capacities and are subject to availability.
    We have made every effort to display as accurately as possible the details and images of our events and services that appear on the website. We cannot guarantee that your computer or mobile device${"'"}s display of any details or images will be accurate.
    St. Joseph Engineering College student organizers, college staff, and the principal reserve the right, but are not obligated, to limit the attendance or participation of any person, from any geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any events or services that we offer. All descriptions of events or services or their pricing are subject to change at any time without notice, at the sole discretion of us. We reserve the right to discontinue any event or service at any time.
    We do not warrant that the quality of any events, services, information, or other material obtained by you at TIARA will meet your expectations, or that any errors in the Service will be corrected.
    `,
},
{
    title: "SECTION 6 - ACCURACY OF REGISTRATION AND ACCOUNT INFORMATION            ",
    description: `We reserve the right to refuse attendance or participation in any event or service organized by TIARA , held by St. Joseph Engineering College, to any person who has provided inaccurate, incomplete, or outdated registration or account information.
    St. Joseph Engineering College student organizers and college staff reserve the right, in their sole discretion, to limit or cancel the attendance or participation of any person, from any geographic region or jurisdiction, and to limit or prohibit attendance or participation that, in our judgment, appear to be made by individuals who violate our policies or abuse the registration or account process.
    You agree to provide current, complete, and accurate registration and account information for all events and services organized by TIARA. You agree to promptly update your account and other information, including your email address and payment information, so that we can complete your transactions and contact you as needed.
    `,
},
{
    title: "SECTION 7 - OPTIONAL TOOLS            ",
    description: `TIARA , held by St. Joseph Engineering College, may provide you with access to third-party tools over which we have no control or input.
    You acknowledge and agree that TIARA provides access to such tools "as is" and "as available" without any warranties, representations, or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.
    Any use by you of optional tools offered through TIARA is entirely at your own risk and discretion, and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).
    TIARA may also offer new services and/or features through the event (including the release of new tools and resources). Such new features and/or services shall also be subject to these Terms and Conditions.
    For more detail, please review our Privacy Policy.
    `,
},

    
];


// Define the component with props
export default function AboutTiara({ title = "Terms & Conditions", sections = tc }) {
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