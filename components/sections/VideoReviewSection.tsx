"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/lib/utils";

export function VideoReviewSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration;
    }
  };

  return (
    <section className="relative overflow-hidden py-24 text-white">
      {/* Background with dark theme similar to Testimonials */}
      <div className="absolute inset-0 bg-[#020d1a]" aria-hidden="true" />
      
      {/* Decorative Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 size-80 rounded-full bg-[#193d73]/35 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-[28rem] rounded-full bg-[#c1121f]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-container px-4">
        <SectionHeader
          centered
          eyebrow="Author Spotlight"
          title="Experience Our Story"
          subtitle="Watch how we bring visions to life through professional publishing and creative storytelling."
          eyebrowClassName="text-white/65"
          titleClassName="text-white"
          subtitleClassName="text-white/72"
        />

        <div className="mt-16 mx-auto max-w-5xl">
          <div className="relative group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-white/20">
            {/* Aspect Ratio Container */}
            <div className="relative aspect-video w-full bg-black/20">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src="/ebook.mp4"
                playsInline
                loop
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
              />

              {/* Center Play Button (Large) */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-all duration-300 hover:bg-black/30"
                  onClick={togglePlay}
                >
                  <div className="relative flex size-24 items-center justify-center rounded-full bg-secondary text-white shadow-[0_0_50px_rgba(212,160,23,0.3)] transition-transform duration-500 group-hover:scale-110">
                    <div className="absolute inset-0 rounded-full animate-ping bg-secondary/20" />
                    <Play className="relative size-10 fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Video Controls Overlay */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300",
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              )}>
                {/* Progress Bar */}
                <div 
                  className="relative h-1.5 w-full bg-white/20 rounded-full mb-6 cursor-pointer overflow-hidden"
                  onClick={handleSeek}
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-secondary transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={togglePlay}
                      className="text-white/90 hover:text-white transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="size-6 fill-current" />
                      ) : (
                        <Play className="size-6 fill-current" />
                      )}
                    </button>

                    <button 
                      onClick={toggleMute}
                      className="text-white/90 hover:text-white transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="size-6" />
                      ) : (
                        <Volume2 className="size-6" />
                      )}
                    </button>
                  </div>

                  <div className="text-sm font-medium text-white/60 tracking-wider">
                    USA GHOST WRITER
                  </div>
                </div>
              </div>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent_40%)]" />
          </div>

          {/* Video Description/Caption for better UI */}
          <div className="mt-8 flex flex-col items-center text-center">
            <p className="text-white/60 text-sm italic">
              &ldquo;Working with USA Ghost Writer was the best decision for my book.&rdquo; &mdash; Featured Author
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
