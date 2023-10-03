import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Login from "./Popups/Login";
import Signup from "./Popups/Signup";
import { useNavigate } from "react-router-dom";
import logImg from "../Assets/logo.svg";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const [openlogin, setOpenLogin] = React.useState(false);
  const [opensignup, setOpenSignup] = React.useState(false);
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
  const user = localStorage.getItem("userName") ? localStorage.getItem("userName") : null;

  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const headerStyles = {
    backgroundColor: "black", // Change to your preferred background color
    color: "white", // Change to your preferred text color
    display: "flex",
    justifyContent: "space-between",
  };

  const logoStyles = {
    fontSize: "30px",
    fontWeight: "700",
    marginRight: "5px",
    fontFamily: 'Roboto'
  };

  const rightButtonStyles = {
    marginLeft: "5px", // Adjust as needed
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={headerStyles}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ display: "flex", alignItems: "center" }}>
            <span style={logoStyles}>     <img src={logImg} alt="" style={{ width: "35px", height: "35px" ,padding : "5px" }} /></span>
            <h3> ZipKart</h3>
          </Typography>
          <div style={{ flex: 1 }}></div>
          {token ? (
            <>
              <Typography variant="body1" component="div" sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                Welcome, {user?user:""}
              </Typography>
              <Button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                color="inherit"
                style={rightButtonStyles}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  setOpenLogin(true);
                }}
                style={rightButtonStyles}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  setOpenSignup(true);
                }}
                style={rightButtonStyles}
              >
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {openlogin && (
        <Login
          setOpenLogin={() => {
            setOpenLogin(false);
          }}
        />
      )}
      {opensignup && (
        <Signup
          setOpenSignup={() => {
            setOpenSignup(false);
          }}
        />
      )}
    </Box>
  );
}
