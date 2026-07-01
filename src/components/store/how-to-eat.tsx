import { Play } from "lucide-react";
import { SectionLabel } from "./section-label";
import { InView } from "./in-view";

const VIDEO_URL = "https://www.youtube.com/watch?v=Ts7RPpYbi8c";

const STEPS = [
  {
    title: "Twist & crack",
    body: "Hold the fruit and gently squeeze near the stem until the thin, leathery shell splits open.",
  },
  {
    title: "Peel the shell",
    body: "Peel back the tan skin to reveal the glossy, translucent flesh — the classic “dragon eye.”",
  },
  {
    title: "Enjoy the flesh",
    body: "Pop the juicy, floral-sweet flesh into your mouth — think grape crossed with lychee.",
  },
  {
    title: "Discard the seed",
    body: "Eat around the single shiny black seed in the center and set it aside — it isn’t edible.",
  },
];

/**
 * "How to eat longan" — a short, branded step-by-step (crack → peel → enjoy →
 * discard the seed) with a link out to a reference video. Client-requested.
 */
export function HowToEat() {
  return (
    <section
      id="how-to-eat"
      className="relative isolate"
      style={{
        backgroundColor: "#fbfdf8",
        marginTop: "-2.5rem",
        borderBottomLeftRadius: "2.5rem",
        borderBottomRightRadius: "2.5rem",
        zIndex: 24,
      }}
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <InView className="mx-auto max-w-2xl text-center">
          <SectionLabel>Enjoying Longan</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
            How to eat <em className="font-medium not-italic text-[#33971f]">longan</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-fr-muted">
            New to the &ldquo;dragon eye&rdquo;? It takes seconds — here&rsquo;s how to open one and
            enjoy the sweet fruit inside.
          </p>
        </InView>

        <InView
          delay={120}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col rounded-2xl bg-white p-6 text-left shadow-[0_10px_30px_-18px_rgba(0,70,85,0.32)] ring-1 ring-fr-border"
            >
              <span
                className="flex items-center justify-center rounded-full font-heading text-lg font-bold text-[#33971f]"
                style={{ width: "3rem", height: "3rem", backgroundColor: "#eef7e1" }}
              >
                {i + 1}
              </span>
              <h3 className="mt-6 font-heading text-lg font-bold text-fr-teal">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fr-muted">{step.body}</p>
            </div>
          ))}
        </InView>

        <div className="mt-12 flex justify-center">
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime"
          >
            <Play className="h-4 w-4" />
            Watch how to open &amp; eat
          </a>
        </div>
      </div>
    </section>
  );
}
