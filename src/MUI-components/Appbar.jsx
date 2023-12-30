import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Toolbar,
  AppBar,
  Avatar,
  Link,
  IconButton,
  Button,
  Box,
  styled,
  Typography,
} from "@mui/material";
import { Favorite, Menu, ShoppingCart } from "@mui/icons-material";
import { purple } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  // @ts-ignore
  backgroundColor: theme.palette.ali.main,
  "&:hover": {
    // @ts-ignore
    backgroundColor: theme.palette.ali.main,
    scale: "0.99",
  },
}));


const Appbar = ({ drawerWidth, showDrawer }) => {
  const userName = useSelector((state) => state.SignIn.userInfo?.name);
  console.log(userName);
  // const name = userName?.split(" ")
  const token = useSelector((state) => state.SignIn.token);
  const cartQuantity = useSelector((state) => state.Cart.cartQuantity);
  const WishListQuantity = useSelector(
    (state) => state.WishList.WishListQuantity
  );

  const navigate = useNavigate();


  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, sm: `${drawerWidth}px` },
        
      }}
      position="fixed"
    >
      <Toolbar >
        <IconButton
          onClick={() => {
            showDrawer();
          }}
          sx={{ mr: "9px", display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <Link
            sx={{
              textDecoration: "none",
            }}
            color="inherit"
            onClick={() => {
              navigate("/");
            }}
          >
            Sakr Ecom
          </Link>
          <Box component="div" sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }} >
            {token && <Button variant="text" color="inherit" onClick={() => {
              navigate("/cart");
            }}><ShoppingCart />({cartQuantity}) </Button>}
            {token && <Button variant="text" color="inherit" onClick={() => {
              navigate("/wishlist");
            }}><Favorite color="error" />({WishListQuantity}) </Button>}
            
            {!token && <ColorButton
        type="submit"
        onClick={() => {
              navigate("/signin");
            }}
        variant="contained"
      >
        Sign In
            </ColorButton>}
            {!token && <ColorButton
              type="submit"
              onClick={() => {
              navigate("/signup");
            }}
              variant="contained"
              sx={{marginLeft: "10px"}}
            >
              Sign Up
            </ColorButton>}
            {/* {token && <Button variant="text" color="inherit" onClick={handleLogout}>
              Logout
            </Button>} */}
            {token && <Link
              sx={{
                textDecoration: "none",
                "&:hover": { fontSize: "16.5px" },
                display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor:"pointer"
              }}
              color="inherit"
              onClick={() => {
                navigate("/profile");
              }}
            >
              {/* <Typography ml={2} mr={1} variant="body1" color="inherit">
                {userName}
              </Typography> */}
              <Avatar alt={userName} src=".." />
            </Link>}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
