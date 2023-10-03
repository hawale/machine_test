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

export default function Login({ setOpenLogin }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    setOpenLogin(false); // Close the login modal when the close button is clicked
  };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameErr, setUsernameErr] = React.useState("");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [instructions] = React.useState("Please enter your credentials.");
  const [showPassword, setShowPassword] = React.useState(false);

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


    const data = {
      userName: username,
      password: password,
    };

    let url = `http://localhost:3200/api/login`;
    axios
      .post(url, data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("userName", res?.data?.data?.userName);
          localStorage.setItem("token", res?.data?.data?.token);
          alert(res?.data?.message);
          // Navigate to Product
          navigate("/Product");
          setOpenLogin(false); // Close the login modal after successful login
        }
      })
      .catch((err) => {
        console.error("Error", err);
        if (err.response && err.response.status === 401) {
          setUsernameErr("Invalid username or password");
          setPasswordErr("Invalid username or password");
        } else if (err.response && err.response.status === 404) {
          setUsernameErr(err.response?.data?.error);
        } else {
          setUsernameErr(err.response?.data?.error);
          setPasswordErr(err.response?.data?.error);
        }
      });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
              Log in
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
              style={inputStyle} // Add margin and width to the input field
            />
            <TextField
              value={password}
              type={showPassword ? "text" : "password"} // Toggle password visibility
              onChange={(e) => {
                setPassword(e.target.value.trimStart());
              }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              error={!!passwordErr}
              helperText={passwordErr}
              style={inputStyle} // Add margin and width to the input field
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
              Login
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
