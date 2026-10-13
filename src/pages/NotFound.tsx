import PageShell from "../components/layout/PageShell";
import { Button } from "../components/common/navigation";

export default function NotFound() {
  return (
    <PageShell>
      <section className="not-found">
        <span>404 / SYSTEM NOTICE</span>

        <h1>
          Looks like this operation went{" "}
          <span className="marker-circle">off track.</span>
        </h1>

        <p>
          The page you're looking for has moved, changed, or never existed.
        </p>

        <Button to="/" variant="dark">
          Back to home
        </Button>
      </section>
    </PageShell>
  );
}