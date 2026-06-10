import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "email") {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {

                setEmailError(
                    "Please enter a valid email address"
                );

            } else {

                setEmailError("");
            }
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {

            setEmailError(
                "Please enter a valid email address"
            );

            return;
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setPasswordError(
                "Passwords do not match"
            );

            return;
        }

        setPasswordError("");

        try {

            await axios.post(
                "http://127.0.0.1:8000/api/accounts/register/",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }
            );

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            console.log(error);

            if (error.response) {

                alert(
                    JSON.stringify(
                        error.response.data
                    )
                );

            } else {

                alert(
                    "Registration Failed"
                );
            }
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                        "rgba(0,0,0,0.55)"
                }}
            />

            <div
                className="card shadow-lg border-0"
                style={{
                    width: "700px",
                    padding: "45px",
                    borderRadius: "25px",
                    background:
                        "rgba(255,255,255,0.15)",
                    backdropFilter:
                        "blur(15px)",
                    zIndex: 10,
                }}
            >

                <div className="text-center mb-4">

                    <h1 className="fw-bold text-white">
                        AI Study Companion
                    </h1>

                    <p className="text-light">
                        Create Your Account
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="form-control mb-4"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{
                            height: "60px",
                            fontSize: "18px"
                        }}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            height: "60px",
                            fontSize: "18px"
                        }}
                    />

                    {emailError && (
                        <small className="text-danger">
                            {emailError}
                        </small>
                    )}

                    <div className="mb-3"></div>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-4"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                            height: "60px",
                            fontSize: "18px"
                        }}
                    />

                    

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{
                            height: "60px",
                            fontSize: "18px"
                        }}
                    />

                    

                    {passwordError && (
                        <small className="text-danger">
                            {passwordError}
                        </small>
                    )}

                    


                    <div className="text-center mt-4"> 
                    <span className="text-light"> Already have an account? </span> 
                    <button className="btn btn-link text-warning fw-bold" onClick={() => navigate("/login") } > Login </button> 
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 text-white fw-bold mt-4"
                        style={{
                            height: "60px",
                            fontSize: "20px",
                            borderRadius: "12px",
                            background:
                                "linear-gradient(135deg,#4F46E5,#06B6D4)",
                            border: "none",
                        }}
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;