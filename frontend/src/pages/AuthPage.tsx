import { useState } from "react";
import "./AuthPage.css";
type AuthPageProps = {
  onClose?: () => void;
  onLogin?: (user: {
    user_id: number;
    full_name: string;
    email: string;
  }) => void;
};
type AuthResponse = {
  message?: string;
  error?: string;
  user?: {
    user_id: number;
    full_name: string;
    email: string;
  };
};

export default function AuthPage({ onClose, onLogin }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const endpoint =
        mode === "login" ? "/api/login" : "/api/register";

      const payload =
        mode === "login"
          ? { email: email.trim(), password }
          : {
              full_name: fullName.trim(),
              email: email.trim(),
              password,
            };

          const response = await fetch(
       `${import.meta.env.VITE_API_BASE_URL || "https://madurai-iyal.onrender.com"}${endpoint}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result: AuthResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setMessage(result.message || "Success!");

       if (mode === "login" && result.user) {
  onLogin?.(result.user);
  setTimeout(() => onClose?.(), 800);
} else {
        setMode("login");
        setPassword("");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <button
          type="button"
          className="auth-back"
          onClick={onClose}
          aria-label="Close login page"
        >
          ✕
        </button>

        <div className="auth-brand">MADURAIYAL</div>
        <p className="auth-eyebrow">YOUR MADURAI JOURNEY</p>

        <h1>
          {mode === "login" ? "Welcome back" : "Join our community"}
        </h1>

        <p className="auth-subtitle">
          {mode === "login"
            ? "Sign in to continue exploring Madurai."
            : "Create an account and discover Madurai like a local."}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setMessage("");
              setError("");
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => {
              setMode("register");
              setMessage("");
              setError("");
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              Full name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full name"
                maxLength={150}
                autoComplete="name"
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              maxLength={255}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-success">{message}</p>}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Discover the stories, culture and soul of Madurai.
        </p>
      </section>
    </main>
  );
}
