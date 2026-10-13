import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Eyebrow from "../../components/common/Eyebrow";
import {
  Button,
  Logo,
} from "../../components/common/navigation";
import { supabase } from "../../services/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (signInError) {
      setError("Invalid email or password.");
      return;
    }

    navigate("/admin");
  }

  return (
    <div className="login-page">
      <div className="login-brand">
        <Logo />

        <div>
          <Eyebrow>Operations, organized.</Eyebrow>

          <h1>The control room for your website.</h1>

          <p>
            Manage stories, people, and every new business opportunity
            in one calm workspace.
          </p>
        </div>

        <span>RUN BUSINESS OPERATION SERVICE</span>
      </div>

      <div className="login-form-wrap">
        <form onSubmit={handleSubmit}>
          <span className="mobile-admin-logo">
            <Logo admin />
          </span>

          <Eyebrow>Secure access</Eyebrow>

          <h2>Welcome back.</h2>
          <p>Sign in to Runbops Admin</p>

          <label>
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p role="alert" className="login-error">
              {error}
            </p>
          )}

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>

            <a href="#forgot">Forgot password?</a>
          </div>

          <Button
            type="submit"
            variant="dark"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <small>
            Admin accounts are created securely by Runbops.
          </small>
        </form>
      </div>
    </div>
  );
}