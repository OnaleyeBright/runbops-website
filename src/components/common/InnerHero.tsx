import type { ReactNode } from "react";
import { Button } from "./navigation";
import Eyebrow from "./Eyebrow";

export default function InnerHero({
  eyebrow,
  title,
  copy,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  image?: string;
}) {
  return (
    <section className={`inner-hero ${image ? "with-image" : ""}`}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{copy}</p>

        <Button to="/contact" variant="dark">
          Start a conversation
        </Button>
      </div>

      {image && (
        <img
          src={image}
          alt="Runbops team collaboration"
        />
      )}
    </section>
  );
}