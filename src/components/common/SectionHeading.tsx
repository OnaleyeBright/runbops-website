import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

export default function SectionHeading({
  eyebrow,
  title,
  copy,
  centered = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}