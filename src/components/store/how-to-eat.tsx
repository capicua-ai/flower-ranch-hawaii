import { SectionLabel } from "./section-label";
import { InView } from "./in-view";

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

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <InView key={step.title} delay={i * 90} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl bg-white p-6 text-left shadow-[0_10px_30px_-18px_rgba(0,70,85,0.32)] ring-1 ring-fr-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-22px_rgba(0,70,85,0.4)] hover:ring-2 hover:ring-fr-lime">
                {/* Step photo */}
                <div
                  className="mb-5 overflow-hidden rounded-xl ring-1 ring-fr-border/60"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/assets/use${i + 1}.png`}
                    alt={step.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="flex shrink-0 items-center justify-center rounded-full font-heading text-base font-bold text-[#33971f]"
                    style={{ width: "2.25rem", height: "2.25rem", backgroundColor: "#eef7e1" }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-fr-teal">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fr-muted">{step.body}</p>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
