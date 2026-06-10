import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "accounts/login/",
                data
            );

            localStorage.setItem(
                "access",
                response.data.access
            );

            localStorage.setItem(
                "refresh",
                response.data.refresh
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                "Invalid Username or Password"
            );
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e')",
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
                        "rgba(0,0,0,0.60)"
                }}
            />

            <div
                className="card shadow-lg border-0"
                style={{
                    width: "700px",
                    padding: "50px",
                    borderRadius: "25px",
                    background:
                        "rgba(255,255,255,0.15)",
                    backdropFilter:
                        "blur(15px)",
                    zIndex: 10,
                }}
            >

                <div className="text-center mb-4">

                    <h1
                        className="fw-bold text-white"
                    >
                        AI Study Companion
                    </h1>

                    <p
                        className="text-light"
                    >
                        Login To Continue Learning
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="form-control mb-4"
                        value={data.username}
                        onChange={handleChange}
                        required
                        style={{
                            height: "60px",
                            fontSize: "18px"
                        }}
                    />

                    <div
                        className="input-group mb-4"
                    >

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            value={data.password}
                            onChange={handleChange}
                            required
                            style={{
                                height: "60px",
                                fontSize: "18px"
                            }}
                        />

                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >
                            {showPassword
                                ? "Hide"
                                : "Show"}
                        </button>

                    </div>

                    <button
                        type="submit"
                        className="btn w-100 text-white fw-bold"
                        style={{
                            height: "60px",
                            fontSize: "20px",
                            borderRadius: "12px",
                            background:
                                "linear-gradient(135deg,#4F46E5,#06B6D4)",
                            border: "none",
                        }}
                    >
                        Login
                    </button>

                </form>

                <div className="text-center mt-4">

                    <span className="text-light">
                        Don't have an account?
                    </span>

                    <button
                        className="btn btn-link text-warning fw-bold"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Register
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;