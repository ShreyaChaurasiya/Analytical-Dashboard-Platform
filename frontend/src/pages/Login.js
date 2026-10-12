import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [notice, setNotice] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setNotice("Sign-in is not connected to the authentication service yet.");
    }

    return (
        <main className="login-page">
            <section className="login-card" aria-labelledby="login-heading">
                <div className="login-brand-mark" aria-hidden="true">ADP</div>
                <p className="login-eyebrow">ANALYTICAL DASHBOARD PLATFORM</p>
                <h1 id="login-heading">Welcome back</h1>
                <p className="login-description">Sign in with the user ID and password issued for your account.</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="user-id">
                        User ID
                        <input
                            id="user-id"
                            name="userId"
                            type="text"
                            placeholder="Enter your user ID"
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                            autoComplete="username"
                            maxLength={64}
                            required
                        />
                    </label>

                    <label htmlFor="password">
                        Password
                        <span className="login-password">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                                onClick={() => setShowPassword((visible) => !visible)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </span>
                    </label>

                    <Link className="login-forgot" to="/forget-password">Forgot password?</Link>
                    <button className="login-submit" type="submit">Sign in</button>
                    {notice && <p className="login-notice" role="status">{notice}</p>}
                </form>

                <p className="login-note">Use only credentials issued to you. Never share your password.</p>
                <p className="login-signup">New to ADP? <Link to="/register">Create an account</Link></p>
            </section>
        </main>
    );
}

export default Login;
