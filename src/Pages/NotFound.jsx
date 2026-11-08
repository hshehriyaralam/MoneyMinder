import { Link } from "react-router-dom";
import { EmptyState } from "../ui/primitives";

export default function NotFound() {
  return (
    <section className="card not-found">
      <EmptyState
        title="That page isn’t here"
        body="The link may be out of date. Head back to your dashboard to keep going."
        action={<Link className="btn" to="/">Go to dashboard</Link>}
      />
    </section>
  );
}
