"use client";

export default function CreateEventLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted">
            <div className="container mx-auto px-4 py-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-grid-black/10 -z-10" />
                    {children}
                </div>
            </div>
            <style jsx global>{`
                ::-webkit-scrollbar {
                    width: 14px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background: #666;
                    border-radius: 8px;
                    border: 3px solid transparent;
                    background-clip: padding-box;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #888;
                    border: 3px solid transparent;
                    background-clip: padding-box;
                }
            `}</style>
        </div>
    );
}
