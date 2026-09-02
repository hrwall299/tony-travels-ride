import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import { useContent } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

export function VehicleVideo() {
  const vehicle = useContent("vehicle");
  const video = vehicle.video;
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };


  return (
    <section className="border-y border-border bg-surface py-16 lg:py-20">
      <div className="section-x grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
        <div>
          <p className="eyebrow">Video</p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase text-primary-dark sm:text-4xl">
            {video.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{video.description}</p>
        </div>

        <div className="relative overflow-hidden border border-border bg-background">
          {video.src ? (
            <>
              <video
                ref={ref}
                src={`${mediaUrl(video.src)}#t=0.1`}
                {...(video.poster ? { poster: mediaUrl(video.poster) } : {})}
                playsInline
                preload="metadata"
                controls={playing}
                onEnded={() => setPlaying(false)}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                onClick={toggle}
                className="aspect-video w-full cursor-pointer bg-black object-cover"
              />

              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause video" : "Play video"}
                className="absolute bottom-4 left-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <div className="relative">
              <img
                src={mediaUrl(video.poster)}
                alt={video.title}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
              <p className="absolute inset-x-0 bottom-0 bg-background/90 px-4 py-2 text-xs text-muted-foreground">
                Video coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
