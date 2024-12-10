import * as React from 'react';

export function VerificationEmail(props) {
    const { username, otp } = props;

    return (
        <html>
            <head />
            <p>Sign in to jobaccepted.com</p>
            <body style={main}>
                <div style={container}>
                    <p style={company}>Welcome, {username}</p>
                    <h1 style={codeTitle}>Your authentication code</h1>
                    <p style={codeDescription}>
                        Enter it in your open browser window or press the sign in button.
                        This code will expire in 15 minutes.
                    </p>
                    <section style={codeContainer}>
                        <h1 style={codeStyle}>{otp}</h1>
                    </section>
                    <section style={buttonContainer}>
                    </section>
                    <p style={paragraph}>Not expecting this email?</p>
                    <p style={paragraph}>
                        Contact{" "}
                        <a href="mailto:support@jobaccepted.com" style={link}>
                            support@jobaccepted.com
                        </a>{" "}
                        if you did not request this code.
                    </p>
                </div>
            </body>
        </html>
    );
}

export default VerificationEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    pAlign: "center",
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginTop: "20px",
    width: "480px",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "12% 6%",
};

const company = {
    fontWeight: "bold",
    fontSize: "18px",
    pAlign: "center",
};

const codeTitle = {
    pAlign: "center",
};

const codeDescription = {
    pAlign: "center",
};

const codeContainer = {
    background: "rgba(0,0,0,.05)",
    borderRadius: "4px",
    margin: "16px auto 14px",
    verticalAlign: "middle",
    width: "280px",
    maxWidth: "100%",
};

const codeStyle = {
    color: "#000",
    display: "inline-block",
    paddingBottom: "8px",
    paddingTop: "8px",
    margin: "0 auto",
    width: "100%",
    pAlign: "center",
    letterSpacing: "8px",
};

const buttonContainer = {
    margin: "27px auto",
    width: "auto",
};

const button = {
    backgroundColor: "#5e6ad2",
    borderRadius: "3px",
    fontWeight: "600",
    color: "#fff",
    pAlign: "center",
    padding: "12px 24px",
    margin: "0 auto",
};

const paragraph = {
    color: "#444",
    letterSpacing: "0",
    padding: "0 40px",
    margin: "0",
    pAlign: "center",
};

const link = {
    color: "#444",
    pDecoration: "underline",
};