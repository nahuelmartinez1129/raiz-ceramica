import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Heading id={id} className="text-4xl leading-[1.05] text-earth sm:text-5xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-earth-soft sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
