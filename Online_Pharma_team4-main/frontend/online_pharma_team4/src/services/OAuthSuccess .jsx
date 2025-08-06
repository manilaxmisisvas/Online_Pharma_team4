import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("JWT parsing failed", e);
    return null;
  }
}

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      alert(" OAuth login failed. No token.");
      navigate("/login");
      return;
    }
    console.log("Token in localStorage:", localStorage.getItem("token"));


    localStorage.setItem("token", token);

    const payload = parseJwt(token);
    if (!payload) {
      alert(" Invalid token received.");
      navigate("/login");
      return;
    }

    console.log(" Decoded JWT payload:", payload);

    fetch("http://localhost:8080/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((user) => {
        console.log("User profile:", user);

        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(" Failed to fetch user profile.");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h3>Completing OAuth login…</h3>
    </div>
  );
}