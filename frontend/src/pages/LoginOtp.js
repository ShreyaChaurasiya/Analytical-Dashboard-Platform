import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function makeCode() {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * letters.length);
        code += letters[index];
    }
    return code;
}

function LoginOtp() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "your email";
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [captcha, setCaptcha] = useState(makeCode);
    const [typed, setTyped] = useState("");

    function handleOtp(event) {
        event.preventDefault();
        setError("");

        if (!otp.trim()) {
            setError("Enter the OTP");
            return;
        }

        if (otp.trim().length !== 6) {
            setError("OTP must be 6 digits");
            return;
        }

        if (!typed.trim()) {
            setError("Enter the captcha");
            return;
        }

        if (typed.trim().toUpperCase() !== captcha.toUpperCase()) {
            setError("Captcha does not match");
            setTyped("");
            setCaptcha(makeCode());
            return;
        }

        navigate("/");
    }

    return (
        <main className="login-page">
            <section className="login-card">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="back-button"
                    aria-label="Go back"
                >
                ←
                </button>
                <h1>Enter OTP</h1>
                <form onSubmit={handleOtp}>
                    <p className="login-signup">We sent a code to {email}.</p>
                    <label>
                        OTP
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="Enter the 6-digit code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
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
                    <button className="login-submit" type="submit">Verify</button>
                    <button
                        type="button"
                        className="login-resend"
                        onClick={() => {
                            setOtp("");
                            setError("");
                        }}
                    >
                        Resend OTP
                    </button>
                </form>
            </section>
        </main>
    );
}

export default LoginOtp;
