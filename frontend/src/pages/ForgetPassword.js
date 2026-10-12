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

function ForgetPassword() {
    const  navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] =useState("");
    const [step, setStep] = useState("email");
    const [captcha, setCaptcha] = useState(makeCode);
    const [typed, setTyped] = useState("");

    function handleEmail(event){
        event.preventDefault();
        setError("");

        const value = email.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!value){
            setError("Enter your email");
            return;
        }

        if(!emailPattern.test(value)){
            setError("Enter a valid email, such as example@gmail.com");
            return;
        }

        const captchaText = typed.trim();

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

        setStep("otp");
    }

    function handleOtp(event){
        event.preventDefault();
        setError("");

        if(!otp.trim()){
            setError("Enter the OTP");
            return;
        }

        if(otp.trim().length !== 6){
            setError("OTP must be 6 digits");
            return;
        }

        setStep("reset");
    }

    function handleReset(event) {
        event.preventDefault();
        setError("");
        const secret = password.trim();
        const hasLetter = /[A-Za-z]/.test(secret);
        const hasNumber = /[0-9]/.test(secret);
        const hasSpecial = /[^A-Za-z0-9]/.test(secret);
        if (!secret) {
            setError("Enter your new password");
            return;
        }
        if (!hasLetter || !hasNumber || !hasSpecial || secret.length < 8) {
            setError("Password must include a letter, a number, a special character, and at least 8 characters");
            return;
        }
        if (secret !== confirmPassword.trim()) {
            setError("Passwords do not match");
            return;
        }
        navigate("/login");
    }


    return (
        <main className="login-page">
            <section className="login-card">
                <h1>Forget Password</h1>
                {step === "email" && (
                    <form onSubmit={handleEmail}>
                        <p className="login-signup">Enter your email to reset your password</p>
                        <label>
                            Email
                            <input
                            type ="text"
                            placeholder="example@gmail.com"
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <button className="login-submit" type="submit">Send OTP</button>
                    </form>
                )}

                {step === "otp" && (
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
                        {error && <p className="login-error">{error}</p>}
                        <button className="login-submit" type="submit">Verify</button>
                    </form>
                )}

                {step === "reset" && (
                    <form onSubmit={handleReset}>
                        <p className="login-signup">Choose a new password.</p>
                        <label>
                            New password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <label>
                            Confirm password
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                        {error && <p className="login-error">{error}</p>}
                        <button className="login-submit" type="submit">Update password</button>
                    </form>
                )}

                <p className="login-signup">
                    Back to <Link to="/login">Log In</Link>
                </p>
            </section>
        </main>
    )
}


export default ForgetPassword;