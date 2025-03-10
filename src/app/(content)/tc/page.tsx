"use client";
import { motion } from "framer-motion";
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Header } from "@/widget/header";
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";

interface Section {
    title: string;
    description: string;
}

// Single interface for page props
interface PageProps {
    params?: any;
    searchParams?: any;
}

const tc = [
    {
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
    {
        title: "SECTION 8 - THIRD-PARTY LINKS",
        description: `Certain content, products, and services available via TIARA , the college fest organized by student organizers of St. Joseph Engineering College, may include materials from third parties.
      Third-party links on the TIARA website may direct you to third-party websites that are not affiliated with the college staff. We, the college staff, are not responsible for examining or evaluating the content or accuracy, and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third parties.
      We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party${"'"}s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
      `,
    },
    {
        title: "SECTION 9 - USER COMMENTS, FEEDBACK, AND OTHER SUBMISSIONS            ",
        description: `If, at our request, you send certain specific submissions related to TIARA , the college fest organized by student organizers of St. Joseph Engineering College (for example, contest entries), or without a request from us, you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, "comments"), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We, the college staff, are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
      We may, but have no obligation to, monitor, edit, or remove content related to TIARA  that we determine in our sole discretion are unlawful, offensive, threatening, libellous, defamatory, pornographic, obscene, or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.
      You agree that your comments related to TIARA  will not violate any right of any third-party, including copyright, trademark, privacy, personality, or other personal or proprietary right. You further agree that your comments will not contain libellous or otherwise unlawful, abusive, or obscene material or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third parties as to the origin of any comments. You are solely responsible for any comments you make related to TIARA and their accuracy. We, the college staff, take no responsibility and assume no liability for any comments posted by you or any third-party related to TIARA .
      `,
    },
    {
        title: "SECTION 10 - PERSONAL INFORMATION",
        description: `Your submission of personal information through the TIARA website is governed by our Privacy Policy. The student organizers and college staff take the privacy of our participants and attendees seriously and are committed to protecting their personal information. Please carefully review our Privacy Policy before submitting any personal information.
      `,
    },
    {
        title: "SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS            ",
        description: `Occasionally there may be information on the TIARA  website or in the Service that contains typographical errors, inaccuracies or omissions that may relate to event details, schedules, locations, pricing, promotions, offers, or any other related information. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information without prior notice.
      We undertake no obligation to update, amend or clarify information in the Service or on any related website, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.
      `,
    },
    {
        title: "SECTION 12 - PROHIBITED USES",
        description: `In addition to other prohibitions as set forth in these terms and conditions, all participants of TIARA are prohibited from using the event or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate the intellectual property rights of the student organizers, college staff, or any other participants; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the event or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the event or any related website, other websites, or the Internet. The student organizers and college staff reserve the right to take appropriate action, including but not limited to, removal from the event, legal action, or termination of access to any related website, for violating any of the prohibited uses.
      `,
    },
    {
        title: "SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY            ",
        description: `We do not guarantee, represent, or warrant that your use of our service, i.e., the TIARA event, will be uninterrupted, timely, secure, or error-free.
      We do not warrant that the results that may be obtained from the use of the event will be accurate or reliable.
      You agree that from time to time, we, the college staff and student organizers, may need to remove the event for indefinite periods of time or cancel the event at any time, without notice to you.
      You expressly agree that your use of, or inability to use, the event is at your sole risk. The event and all products and services delivered to you through the event are (except as expressly stated by us) provided ${"'"}as is${"'"} and ${"'"}as available${"'"} for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.
      In no case shall St. Joseph Engineering College, its directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors, including the student organizers, be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation, lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the event or any products or services procured using the event, or for any other claim related in any way to your use of the event or any product or service, including, but not limited to, any errors or omissions in any content or any loss or damage of any kind incurred as a result of the use of the event or any content (or product) posted, transmitted, or otherwise made available via the event, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
      `,
    },
    {
        title: "SECTION 14 - INDEMNIFICATION",
        description: `You agree to indemnify, defend and hold harmless St. Joseph Engineering College and its student organizers, college staff, parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees, harmless from any claim or demand, including reasonable attorneys fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party in relation to your participation in TIARA .
      `,
    },
    {
        title: "SECTION 15 - SEVERABILITY            ",
        description: `In the event that any provision of these Terms of Service related to TIARA , held by St. Joseph Engineering College, is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service. Such determination shall not affect the validity and enforceability of any other remaining provisions that remain relevant to TIARA .
      `,
    },
    {
        title: "SECTION 16 - TERMINATION",
        description: `The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
      These Terms of Service are effective unless and until terminated by either the student organizers or the college staff of TIARA , held by St. Joseph Engineering College. The student organizers or college staff may terminate these Terms of Service at any time by notifying the other party that they no longer wish to continue with the organization of the fest or by ceasing to use the services provided by the other party.
      If, in the sole judgment of either the student organizers or the college staff, the other party fails, or they suspect that the other party has failed, to comply with any term or provision of these Terms of Service, they may terminate this agreement at any time without notice, and the party at fault will remain liable for all amounts due up to and including the date of termination. The party terminating the agreement may also deny the other party access to their services or any part thereof.
      `,
    },
    {
        title: "SECTION 17 - ENTIRE AGREEMENT            ",
        description: `The failure of either the student organizers or the college staff of TIARA , held by St. Joseph Engineering College, to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
      These Terms of Service and any policies or operating rules posted by the student organizers or the college staff in respect to the college fest, TIARA , constitutes the entire agreement and understanding between the student organizers and the college staff, and govern their organization of the fest, superseding any prior or contemporaneous agreements, communications, and proposals, whether oral or written, between them (including, but not limited to, any prior versions of the Terms of Service).
      Any ambiguities in the interpretation of these Terms of Service shall not be construed against either the student organizers or the college staff as the drafting party.
      `,
    },
    {
        title: "SECTION 18 - GOVERNING LAW            ",
        description: `These Terms of Service and any separate agreements whereby the student organizers or the college staff of TIARA , held by St. Joseph Engineering College, provide services for the fest, shall be governed by and construed in accordance with the laws of India and the jurisdiction of Karkala, Karnataka.
      `,
    },
    {
        title: "SECTION 19 - CHANGES TO TERMS OF SERVICE",
        description: `The student organizers or the college staff of TIARA , held by St. Joseph Engineering College, may modify, update, or replace any part of these Terms of Service at their sole discretion by posting updates and changes on the website. The most current version of the Terms of Service can be reviewed at any time on the website.
      It is the responsibility of the other party to check the website periodically for any changes to the Terms of Service. The continued use of or access to the website or the services provided by either party following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
      `,
    },
    {
        title: "SECTION 20 - CONTACT INFORMATION            ",
        description: `Any questions about the Terms of Service of TIARA , held by St. Joseph Engineering College, should be directed to the student organizers and college staff at the following contact information:
      Email: <a href="mailto:tiara@sjec.ac.in">tiara@sjec.ac.in</a>
      Phone: <a href =tel: "+918867656481">91 88676 56481</a>  or <a href = tel:"+918073432948" >91 80734 32948</a>
      `,
    },
];

export default function Page(_props: PageProps) {
    const title = "Terms & Conditions";
    const sections = tc;

    return (
        <>
            <Header />
            <ShaderVisualization />
            <section className="relative min-h-screen mt-10 w-full flex justify-center items-center">
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
                                transition={{ delay: 1.0 + index * 0.2, duration: 0.6 }}
                            >
                                {section.title && (
                                    <h1 className="text-3xl mb-3 md:text-4xl">{section.title}</h1>
                                )}
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: section.description.replace(
                                            /<a /g,
                                            `<a style="color: #3b82f6; text-decoration: underline;"`
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
    );
}
