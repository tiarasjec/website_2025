"use client";

import { ThreeDCard } from "@/components/ui/three-d-card";
import teamData from "./information/data.json";
import { tiaraFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function Team() {
  return (
    <div className="min-h-screen w-full px-4 py-16">
      {/* Title Section */}
      <div className="text-center mt-16 mb-16">
        <h1 className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-bold",
          tiaraFont.className
        )}>
          Our Team
        </h1>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.teamMembers.map((member) => (
            <div key={member.id} className="flex justify-center">
              <ThreeDCard
                title={member.name}
                imageUrl={member.imageUrl}
                backgroundUrl={member.backgroundUrl}
                className="w-[300px] h-[400px] sm:w-[350px] sm:h-[450px]"
                variant="border"
                
              >
                <div className="space-y-2 mb-2">
                  <p className="text-sm text-white/90">{member.role}</p>
                </div>
              </ThreeDCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}