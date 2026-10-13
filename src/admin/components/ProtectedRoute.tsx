
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    let requestId = 0;

    async function checkAdminAccess() {
      const currentRequest = ++requestId;

      if (mounted) {
        setLoading(true);
        setError("");
        setAuthorized(false);
      }

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          if (mounted && currentRequest === requestId) {
            setAuthenticated(false);
            setAuthorized(false);
          }
          return;
        }

        const { data, error: adminError } = await supabase
          .from("admin_users")
          .select("user_id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (adminError) {
          throw adminError;
        }

        if (mounted && currentRequest === requestId) {
          setAuthenticated(true);
          setAuthorized(Boolean(data));
        }
      } catch (err) {
        console.error("Admin verification failed:", err);

        if (mounted && currentRequest === requestId) {
          setError("Unable to verify administrator access.");
        }
      } finally {
        if (mounted && currentRequest === requestId) {
          setLoading(false);
        }
      }
    }

    void checkAdminAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // Defer Supabase calls outside the auth callback.
      setTimeout(() => {
        if (mounted) {
          void checkAdminAccess();
        }
      }, 0);
    });

    return () => {
      mounted = false;
      requestId++;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="admin-auth-loading">
        Verifying administrator access...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-auth-loading" role="alert">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!authorized) {
    return (
      <div className="admin-auth-loading" role="alert">
        <h2>Access denied</h2>
        <p>
          Your account is not authorized to access the
          Runbops Admin Dashboard.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
