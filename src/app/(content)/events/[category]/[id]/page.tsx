"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TiltedCard from "@/components/ui/Tilted-card";
import { cn } from "@/lib/utils";
import { tiaraFont } from "@/lib/fonts";
import { Calendar, Clock, Users, Info, Award, Phone } from "lucide-react";
import { Header } from "@/widget/header";
import Footer from "@/widget/footer";
import ShaderVisualization from "@/widget/background";
import Loading from "@/app/loading";
import { EncryptButton } from "@/components/ui/hover/button";

export interface Event {
    name: string;
    team: string;
    description: string;
    costs: number;
    rules: string[];
    prerequisites: string[];
    general_rules: string[];
    thumbnail: string;
    startTime: string;
    endTime: string | undefined;
    facultyCoordinators: FacultyCoordinator[];
    studentCoordinators: StudentCoordinator[];
    teamEvent: boolean;
}

export interface FacultyCoordinator {
    name: string;
    email: string;
    phone: string;
}

export interface StudentCoordinator {
    name: string;
    email: string;
    phone: string;
}

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const Page = () => {
    const [eventInfo, setEventInfo] = useState<Event>();
    const pathname = usePathname();
    // const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // setLoading(true);
        const [, , category, path] = pathname.split("/");
        fetch(`/api/events/active/${category}/${path}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setEventInfo(data.event);
                // setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                // setLoading(false);
            });
    }, [pathname]);

    const startTime = eventInfo?.startTime ? new Date(eventInfo.startTime) : null;
    const endTime = eventInfo?.endTime ? new Date(eventInfo.endTime) : null;
    const formattedDate = startTime
        ? startTime.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "";
    const formattedTime = startTime
        ? startTime
              .toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
              })
              .toLowerCase()
        : "";

    // if (loading) return <Loading />;

    return (
        <>
            <Header />
            <ShaderVisualization />
            <div className="min-h-screen  pt-24 pb-16">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="container mx-auto px-4 sm:px-6"
                >
                    {/* Hero Section */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
                        <motion.div variants={fadeIn} className="lg:w-1/2 space-y-6">
                            <motion.h1
                                variants={fadeIn}
                                className="text-4xl md:text-5xl xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                            >
                                {eventInfo?.name}
                            </motion.h1>

                            <motion.p
                                variants={fadeIn}
                                className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                            >
                                {eventInfo?.description}
                            </motion.p>

                            <motion.div
                                variants={fadeIn}
                                className="flex items-center space-x-4 text-gray-300"
                            >
                                <Calendar className="h-5 w-5 text-tiara_red" />
                                <span className={cn("tracking-wide text-lg", tiaraFont.className)}>
                                    {formattedDate}
                                </span>
                            </motion.div>

                            <motion.div
                                variants={fadeIn}
                                className="flex items-center space-x-4 text-gray-300"
                            >
                                <Clock className="h-5 w-5 text-tiara_red" />
                                <span className={cn("tracking-wide text-lg", tiaraFont.className)}>
                                    {formattedTime}
                                </span>
                            </motion.div>

                            <motion.div
                                variants={fadeIn}
                                className="flex items-center space-x-4 text-gray-300"
                            >
                                <Users className="h-5 w-5 text-tiara_red" />
                                <span className={cn("tracking-wide text-lg", tiaraFont.className)}>
                                    ₹{eventInfo?.costs}/{eventInfo?.teamEvent ? "team" : "person"}
                                </span>
                            </motion.div>

                            <motion.div
                                variants={fadeIn}
                                className="flex items-center space-x-4 text-gray-300"
                            >
                                {/* {eventInfo?.teamEvent ? (
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-tiara_red" />
                <span className={cn("tracking-wide text-lg", tiaraFont.className)}>Team-Based Event</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-tiara_red" />
                <span className={cn("tracking-wide text-lg", tiaraFont.className)}>Individual Event</span>
              </div>
            )} */}
                            </motion.div>

                            <motion.div variants={fadeIn} whileTap={{ scale: 0.95 }} className="pt-4">
                                <Link href="/register">
                                    <EncryptButton targetText="register now" />
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={fadeIn}
                            className="lg:w-1/2 flex justify-center"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-white rounded-2xl blur opacity-75"></div>
                                <Image
                                    src={eventInfo?.thumbnail || ""}
                                    width={500}
                                    height={500}
                                    alt={eventInfo?.name || "Event thumbnail"}
                                    className="relative rounded-xl object-cover shadow-2xl"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Details Section */}
                    <div className="grid md:grid-cols-2 gap-12 mt-16">
                        {/* Prerequisites */}
                        {/* {eventInfo && eventInfo.prerequisites.length > 0 && (
            <motion.div
            variants={fadeIn}
            className=" backdrop-blur-sm p-8 rounded-xl shadow-2xl bg-white bg-opacity-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Info className="h-6 w-6 text-tiara_red" />
                <h2 className="text-2xl font-bold text-white">Prerequisites</h2>
              </div>
              <motion.ul variants={staggerContainer} className="space-y-3">
                {eventInfo?.prerequisites.map((prerequisite, index) => (
                  <motion.li key={index} variants={fadeIn} className="flex items-start gap-3">
                    <span className="text-tiara_red mt-1">•</span>
                    <span className="text-gray-300">{prerequisite}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )} */}

                        {/* Rules */}
                        <motion.div
                            variants={fadeIn}
                            className="md:col-span-2 bg-white backdrop-blur-sm p-8 rounded-xl bg-opacity-10 shadow-2xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Award className="h-6 w-6 text-tiara_red" />
                                <h2 className="text-2xl font-bold text-white">Rules</h2>
                            </div>
                            <motion.ul variants={staggerContainer} className="space-y-3">
                                {eventInfo?.rules.map((rule, index) => (
                                    <motion.li
                                        key={index}
                                        variants={fadeIn}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="text-tiara_red mt-1">•</span>
                                        <span className="text-gray-300">{rule}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        {/* Event Coordinators */}
                        <motion.div
                            variants={fadeIn}
                            className="md:col-span-2 bg-white backdrop-blur-sm p-8 rounded-xl bg-opacity-10 shadow-2xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Phone className="h-6 w-6 text-tiara_red" />
                                <h2 className="text-2xl font-bold text-white">Event Coordinators</h2>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {eventInfo?.studentCoordinators.map((coordinator, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeIn}
                                        whileHover={{ scale: 1.03 }}
                                        className="bg-white p-4 rounded-lg bg-opacity-15"
                                    >
                                        <h3 className="text-lg font-medium text-white mb-2">
                                            {coordinator.name}
                                        </h3>
                                        <a
                                            href={`tel:+91${coordinator.phone}`}
                                            className="text-gray-300 hover:text-tiara_red transition-colors flex items-center gap-2"
                                        >
                                            <Phone className="h-4 w-4" />
                                            {coordinator.phone}
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default Page;
