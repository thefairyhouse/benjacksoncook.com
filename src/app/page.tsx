"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type VideoItem = {
  title: string;
  url: string;
};

function getYouTubeId(url: string) {
  try {
    const u = new URL(url);

    if (u.hostname === "youtu.be") {
      return u.pathname.replace("/", "").trim() || null;
    }

    const v = u.searchParams.get("v");
    if (v) return v;

    const parts = u.pathname.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];

    return null;
  } catch {
    return null;
  }
}

function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="fade-in">
      {children}
    </div>
  );
}

function YouTubeTile({ title, url }: VideoItem) {
  const id = useMemo(() => getYouTubeId(url), [url]);
  const [loaded, setLoaded] = useState(false);

  if (!id) {
    return (
      <div className="space-y-3">
        <div className="aspect-video w-full rounded-[6px] bg-black/10" />
        <div className="text-sm tracking-wide opacity-80">{title}</div>
      </div>
    );
  }

  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const embed = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className="space-y-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-[6px] bg-black/10">
        {loaded ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embed}
            title={title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="absolute inset-0 h-full w-full"
            aria-label={`Play ${title}`}
          >
            <Image
              src={thumb}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-12 w-12 rounded-full border border-white/60 bg-black/20" />
            </div>
          </button>
        )}
      </div>
      <div className="text-sm tracking-wide opacity-80">{title}</div>
    </div>
  );
}

const records: VideoItem[] = [
  {
    title: "Rag’n’Bone Man — Songwriting",
    url: "https://www.youtube.com/watch?v=EsmaAk5MDz8",
  },
  {
    title: "Don Broco & Nickelback — Songwriting",
    url: "https://youtu.be/jcrNNpMkBQ4",
  },
  {
    title: "P!nk — Songwriting",
    url: "https://www.youtube.com/watch?v=ilut9TzMfXs",
  },
  {
    title: "Dottie Andersson — Songwriting / Production",
    url: "https://www.youtube.com/watch?v=enomoC1cSO4",
  },
  {
    title: "Nothing But Thieves — Songwriting / Production",
    url: "https://www.youtube.com/watch?v=xVf2DXAnQFo",
  },
  {
    title: "Alissic — Songwriting",
    url: "https://www.youtube.com/watch?v=nL5RVGKEfpA",
  },
  {
    title: "Jamie Grey — Songwriting",
    url: "https://www.youtube.com/watch?v=DwhTlXvLMr8",
  },
  {
    title: "Valencia Grace — Songwriting",
    url: "https://www.youtube.com/watch?v=Ca9GmeOKVN0",
  },
  {
    title: "Lucy Blue — Songwriting / Production",
    url: "https://www.youtube.com/watch?v=u96C-Yu_I5Q",
  },
];

const broadcast: VideoItem[] = [
  {
    title: "The BRIT Awards (Calvin Harris) — Vocal Arrangement",
    url: "https://www.youtube.com/watch?v=SMRVFIrPevA",
  },
  {
    title: "The BRIT Awards (Jorja Smith) — Arrangement / Keys",
    url: "https://www.youtube.com/watch?v=mcJu5owNQtM",
  },
  {
    title: "Echo Awards (Germany) — Arrangement / Keys",
    url: "https://www.youtube.com/watch?v=CdVojfp5Ulw",
  },
  {
    title: "BBC Radio 1 Live Lounge — Arrangement / Keys",
    url: "https://www.youtube.com/watch?v=_W6IaB642FM",
  },
  {
    title: "BBC Live Lounge — Arrangement / Keys",
    url: "https://www.youtube.com/watch?v=YYTLxoEcVF0",
  },
  {
    title: "BBC Radio 2 Piano Room — Arrangement / Keys",
    url: "https://www.youtube.com/watch?v=lH5wI35WMHo",
  },
  {
    title: "MTV Push — Arrangement / Keys",
    url: "https://www.youtube.com/watch?v=rjBDxcnfSMw",
  },
  {
    title: "Rag’n’Bone Man — Musical Director / Keys",
    url: "https://www.youtube.com/watch?v=zA-zoyipi6A",
  },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm tracking-wide text-[var(--dark)]/80 hover:text-[var(--dark)]"
    >
      {children}
    </a>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAllRecords, setShowAllRecords] = useState(false);

  const recordsToShow = showAllRecords ? records : records.slice(0, 6);

  return (
    <div className="min-h-screen bg-[var(--light)] text-[var(--dark)]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[var(--light)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="heading text-base tracking-wide">
            Ben Jackson-Cook
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink href="#records">Records</NavLink>
            <NavLink href="#broadcast">Broadcast & Live</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <button
            type="button"
            className="md:hidden text-sm tracking-wide text-[var(--dark)]/80"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>

        {mobileOpen ? (
          <div id="mobile-nav" className="border-t border-black/5 bg-[var(--light)]">
            <div className="mx-auto grid max-w-6xl gap-4 px-6 py-6">
              <a href="#records" onClick={() => setMobileOpen(false)} className="text-sm tracking-wide opacity-80">
                Records
              </a>
              <a href="#broadcast" onClick={() => setMobileOpen(false)} className="text-sm tracking-wide opacity-80">
                Broadcast & Live
              </a>
              <a href="#about" onClick={() => setMobileOpen(false)} className="text-sm tracking-wide opacity-80">
                About
              </a>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="text-sm tracking-wide opacity-80">
                Contact
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="relative min-h-[100svh]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,242,235,0.2) 0%, rgba(245,242,235,1) 70%), radial-gradient(1200px 600px at 50% 10%, rgba(26,26,26,0.25) 0%, rgba(26,26,26,0) 60%)",
            }}
          />
          <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-6">
            <div className="max-w-3xl">
              <h1 className="heading text-5xl leading-[1.05] tracking-tight sm:text-6xl">
                Ben Jackson-Cook
              </h1>
              <div className="mt-6 text-base tracking-wide text-[var(--dark)]/80 sm:text-lg">
                Songwriter / Producer / Musical Director / Touring Keys Player
              </div>
            </div>
          </div>
        </section>

        <section id="records" className="bg-[var(--light)]">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
            <FadeInSection>
              <h2 className="heading text-4xl tracking-tight">Records</h2>
              <div className="mt-3 text-sm tracking-[0.18em] text-[var(--dark)]/70">
                Writing • Production
              </div>
            </FadeInSection>

            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
              {recordsToShow.map((v) => (
                <FadeInSection key={v.title}>
                  <YouTubeTile title={v.title} url={v.url} />
                </FadeInSection>
              ))}
            </div>

            {!showAllRecords ? (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllRecords(true)}
                  className="text-sm tracking-wide text-[var(--accent)] hover:underline"
                >
                  Load more
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <section id="broadcast" className="bg-[var(--dark)] text-[var(--light)]">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
            <FadeInSection>
              <h2 className="heading text-4xl tracking-tight">Broadcast & Live Direction</h2>
              <div className="mt-3 text-sm tracking-[0.18em] text-[var(--light)]/70">
                Musical Direction • Arrangement • Keys
              </div>
            </FadeInSection>

            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
              {broadcast.map((v) => (
                <FadeInSection key={v.title}>
                  <YouTubeTile title={v.title} url={v.url} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-[var(--light)]">
          <div className="mx-auto max-w-3xl px-6 py-24 md:py-28">
            <FadeInSection>
              <div className="text-center">
                <h2 className="heading text-4xl tracking-tight">About</h2>
                <div className="mt-10 text-lg leading-8 tracking-wide text-[var(--dark)]/85">
                  Studio to stage.
                  <br />
                  Writing records. Producing artists. Leading live shows.
                </div>

                <div className="mx-auto mt-12 h-64 w-64 rounded-[6px] bg-black/10" />
              </div>
            </FadeInSection>
          </div>
        </section>

        <section id="contact" className="bg-[var(--dark)] text-[var(--light)]">
          <div className="mx-auto max-w-3xl px-6 py-24 md:py-28">
            <FadeInSection>
              <div className="text-center">
                <h2 className="heading text-4xl tracking-tight">Contact</h2>
                <div className="mt-12 space-y-10 text-base tracking-wide">
                  <div>
                    <div className="text-[var(--light)]/70">Management</div>
                    <a
                      className="mt-1 block text-[var(--light)] hover:text-[var(--light)]/90"
                      href="mailto:jill@echobeachmusic.com"
                    >
                      jill@echobeachmusic.com
                    </a>
                  </div>

                  <div>
                    <div className="text-[var(--light)]/70">Instagram</div>
                    <a
                      className="mt-1 block text-[var(--light)] hover:text-[var(--light)]/90"
                      href="https://instagram.com/benjacksoncook"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @benjacksoncook
                    </a>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>
    </div>
  );
}
