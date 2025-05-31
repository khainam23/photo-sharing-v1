import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

function LoginRegister({ onLogin }) {
  const [loginName, setLoginName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginName.trim()) {
      setError("Please enter a login name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8081/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for session cookies
        body: JSON.stringify({ login_name: loginName.trim() }),
      });

      if (response.ok) {
        const userData = await response.json();
        onLogin(userData); // Pass user data to parent component
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Please Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Login Name"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            margin="normal"
            disabled={loading}
            autoFocus
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginRegister;
