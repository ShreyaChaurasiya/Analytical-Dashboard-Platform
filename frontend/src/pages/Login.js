import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function makeCode() {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * letters.length);
        code += letters[index];
    }
    return code;
}

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [captcha, setCaptcha] = useState(makeCode);
    const [typed, setTyped] = useState("");

    function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const name = username.trim();
    const secret = password.trim();
    const captchaText = typed.trim();

    const hasLetter = /[A-Za-z]/.test(secret);
    const hasNumber = /[0-9]/.test(secret);
    const hasSpecial = /[^A-Za-z0-9]/.test(secret);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
        setError("Enter your email");
        return;
    }

    if (!emailPattern.test(name)) {
        setError("Enter a valid email, such as example@gmail.com");
        return;
    }

    if (!secret) {
        setError("Enter your password");
        return;
    }

    if (!hasLetter  || !hasNumber || !hasSpecial || secret.length < 8) {
        setError("Password must be include letter, number, Special character and  at least 8 characters");
        return;
    }

    if (!captchaText) {
        setError("Enter the captcha");
        return;
    }

    if (captchaText.toUpperCase() !== captcha.toUpperCase()) {
        setError("Captcha does not match");
        setTyped("");
        setCaptcha(makeCode());
        return;
    }

        navigate("/login/otp", { state: { email: name } });
    }

    return (
        <main className="login-page">
            <section className="login-card">
                <h1>Log in</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label>
                        Username or Email
                        <input
                            type="text"
                            placeholder="example@gmail.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="off"
                            readOnly
                            onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
                        />
                    </label>
                    <label>
                        Password
                        <span className="login-password">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                readOnly
                                onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
                            />
                            <button
                                type="button"
                                aria-label="Show password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </span>
                    </label>

                    <label>
                        Enter Captcha
                        <span className="captcha-code">{captcha.split("").join(" ")}</span>
                        <span className="captcha-input">
                            <input
                                type="text"
                                placeholder="Enter captcha"
                                value={typed}
                                onChange={(e) => setTyped(e.target.value)}
                            />
                            <button
                                type="button"
                                aria-label="New captcha"
                                onClick={() => {
                                    setCaptcha(makeCode());
                                    setTyped("");
                                }}
                            >
                                ↻
                            </button>
                        </span>
                    </label>

                    {error && <p className="login-error">{error}</p>}

                    <Link className="login-forgot" to="/forget-password">Forgot password</Link>
                    <button className="login-submit" type="submit">Sign In</button>
                </form>

                <p className="login-note">
                    By continuing, you agree to the Privacy Policy & Cookie Policy.
                </p>
            </section>
        </main>
    );
}

export default Login;
