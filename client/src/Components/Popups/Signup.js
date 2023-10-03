import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  style,
  formContainerStyle,
  inputStyle,
} from "./styles";

export default function Signup({ setOpenSignup }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    setOpenSignup(false); // Close the signup modal when the close button is clicked
  };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameErr, setUsernameErr] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [instructions] = React.useState("Please enter your details.");

  // Password validation function
  const isStrongPassword = (value) => {
    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
    return strongPasswordRegex.test(value);
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Submit function
  const handleSubmit = () => {
    setUsernameErr("");
    setPasswordErr("");

    if (!username) {
      setUsernameErr("Username is required");
      return;
    }

    if (!password) {
      setPasswordErr("Password is required");
      return;
    }

    if (!isStrongPassword(password)) {
      setPasswordErr(
        "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    const data = {
      userName: username,
      password: password,
    };

    let url = `http://localhost:3200/api/signup`;
    axios
      .post(url, data)
      .then((res) => {
        if (res.status === 201) {
          alert(res?.data?.message);
          navigate("/");
          setOpenSignup(false); // Close the signup modal after successful signup
        }
      })
      .catch((err) => {
        console.error("Error", err);

        if (err?.response) {
          if (err?.response?.status === 409) {
            setUsernameErr(err?.response?.data?.error);
          } else {
            setUsernameErr(err?.response?.data?.error);
            setPasswordErr(err?.response?.data?.error);
          }
        }
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" gutterBottom>
              Sign up
            </Typography>
            <Button onClick={handleClose} color="secondary">
              <CloseIcon />
            </Button>
          </div>
          <br />
          <Typography variant="body1" gutterBottom>
            {instructions}
          </Typography>
          <br />
          <div style={formContainerStyle}>
            <TextField
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.trimStart());
              }}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              error={!!usernameErr}
              helperText={usernameErr}
              style={inputStyle} 
            />
            <TextField
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value.trimStart());
              }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              error={!!passwordErr}
              helperText={passwordErr}
              style={inputStyle} 
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <Button onClick={handleSubmit} variant="contained" fullWidth>
              Sign up
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
