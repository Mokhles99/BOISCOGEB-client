import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Badge,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { MdShoppingCart } from "react-icons/md";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";
import {
  getCarttwo,
  updateCartWithUserInfo,
  removeItemFromCart,
  updateItemQuantity,
  createNewCart,
  clearCart,
} from "../../actions/carttwo.actions";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import i18next

const MySwal = withReactContent(Swal);

function CartIcon() {
    const { t } = useTranslation(); // Hook pour traduction

  const [modalOpen, setModalOpen] = useState(false);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const carttwo = useSelector(
    (state) => state.carttwo.carttwo || { items: [] }
  );

  const [itemQuantities, setItemQuantities] = useState({});
  const isLargeScreen = useMediaQuery("(min-width:1280px)");

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      dispatch(getCarttwo(cartId));
    } else {
      dispatch(createNewCart());
    }
  }, [dispatch]);

  useEffect(() => {
    if (carttwo && carttwo.items) {
      const updatedQuantities = {};
      let quantitiesChanged = false;

      carttwo.items.forEach((item) => {
        if (itemQuantities[item._id] !== item.quantity) {
          updatedQuantities[item._id] = item.quantity;
          quantitiesChanged = true;
        }
      });

      if (quantitiesChanged) {
        setItemQuantities(updatedQuantities);
      }
    }
  }, [carttwo.items]);

  const handleOpenModal = () => {
    const cartId = localStorage.getItem("cartId");
    dispatch(getCarttwo(cartId));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenUserInfoModal = () => {
    setUserInfoModalOpen(true);
    setModalOpen(false);
  };

  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{8}$/;

    if (!userInfo.name) newErrors.name = t("cart.errors.name"); // Utiliser la clé de traduction
    if (!userInfo.surname) newErrors.surname = t("cart.errors.surname");
    if (!userInfo.email) {
      newErrors.email = t("cart.errors.email");
    } else if (!emailRegex.test(userInfo.email)) {
      newErrors.email = t("cart.errors.emailInvalid");
    }
    if (!userInfo.phoneNumber) {
      newErrors.phoneNumber = t("cart.errors.phoneNumber");
    } else if (!phoneRegex.test(userInfo.phoneNumber)) {
      newErrors.phoneNumber = t("cart.errors.phoneNumberInvalid");
    }
    if (!userInfo.message) newErrors.message = t("cart.errors.message");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const cartId = localStorage.getItem("cartId");

    try {
      await dispatch(updateCartWithUserInfo(cartId, userInfo));
      handleCloseUserInfoModal();
      dispatch(clearCart());
      localStorage.removeItem("cartItems");
      dispatch(createNewCart());

      // Show success alert
      MySwal.fire({
        icon: "success",
        title: t("cart.successTitle"), // Utiliser la clé de traduction
        text: t("cart.successMessage"), // Utiliser la clé de traduction
        confirmButtonColor: "#1D8D7F",
      });

      // Clear user info fields
      setUserInfo({
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleIncreaseQuantity = (itemId) => {
    const cartId = localStorage.getItem("cartId");
    const newQuantity = (itemQuantities[itemId] || 0) + 1;
    setItemQuantities({ ...itemQuantities, [itemId]: newQuantity });
    dispatch(updateItemQuantity(cartId, itemId, newQuantity));
  };

  const handleDecreaseQuantity = async (itemId) => {
    const cartId = localStorage.getItem("cartId");

    if (itemQuantities[itemId] > 1) {
      const newQuantity = itemQuantities[itemId] - 1;
      setItemQuantities({ ...itemQuantities, [itemId]: newQuantity });
      await dispatch(updateItemQuantity(cartId, itemId, newQuantity));
    } else {
      const newItems = { ...itemQuantities };
      delete newItems[itemId];
      setItemQuantities(newItems);
      await dispatch(removeItemFromCart(carttwo._id, itemId));
    }
    dispatch(getCarttwo(cartId));
  };

  const handleRemoveItem = async (itemId) => {
    const cartId = localStorage.getItem("cartId");

    // Remove the item from the cart
    await dispatch(removeItemFromCart(carttwo._id, itemId));

    // Update local state
    setItemQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[itemId];
      return newQuantities;
    });

    // Fetch the updated cart
    dispatch(getCarttwo(cartId));
  };
  const handleManualQuantityChange = (itemId, value) => {
    const cartId = localStorage.getItem("cartId");
    const newQuantity = parseInt(value, 10);

    if (newQuantity > 0) {
      setItemQuantities({ ...itemQuantities, [itemId]: newQuantity });
      dispatch(updateItemQuantity(cartId, itemId, newQuantity));
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%", // Par défaut, 30% de la largeur
    bgcolor: "#f1f1f1",
    borderRadius: "30px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    p: 4,
    color: "#FFF",
    fontFamily: "cursive",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "@media (max-width: 768px)": {
      width: "95%", // 50% de la largeur pour les appareils de 1024px ou moins
    },
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#ffd700",
      color: "black",
      width: "5px",
      height: "20px",
      fontSize: "0.8rem",
      transform: "translateY(-60%)",
      right: "-18px",
    },
  }));

  return (
    <>
      <div className="cart-icon-fixed" onClick={handleOpenModal}>
        <StyledBadge badgeContent={carttwo ? carttwo.items.length : 0}>
          <MdShoppingCart style={{ color: "#664532", fontSize: 25 }} />
        </StyledBadge>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="cart-modal-title"
        aria-describedby="cart-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="cart-modal-title"
            variant="h6"
            component="h2"
            className="goldenCursiveText"
            style={{ color: "grey" }}
          >
            {t("cart.title")}
          </Typography>
          <List
            sx={{
              width: "100%",
              maxHeight: 200,
              overflow: "auto",
              color: "black",
            }}
          >
            {carttwo.items &&
              carttwo.items.map((item) => {
                const quantity = itemQuantities[item._id] || item.quantity;
                return (
                  <ListItem key={item._id} alignItems="flex-start">
                    <ListItemText
                      primary={
                        item.product ? ( // Vérifiez que item.product n'est pas null ou undefined
                          <span>
                            {item.product.name}
                            <span
                              style={{
                                marginLeft: "15px",
                                color: "#36454F",
                                fontWeight: "bold",
                              }}
                            >
                              x{" "}
                              <input
                                type="number"
                                value={quantity}
                                onChange={(e) =>
                                  handleManualQuantityChange(
                                    item._id,
                                    e.target.value
                                  )
                                }
                                style={{
                                  width: "60px",
                                  textAlign: "right",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                  padding: "2px 4px",
                                }}
                              />{" "}
                              m<sup>3</sup>
                            </span>
                            <br />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "grey",
                                display: "block",
                                marginTop: "5px",
                              }}
                            >
                              REF: {item.product.REF}
                            </span>
                          </span>
                        ) : null // Si item.product est null ou undefined, ne rien afficher
                      }
                    />

                    <IconButton
                      onClick={() => handleIncreaseQuantity(item._id)}
                      sx={{
                        color: "#11A592",
                        padding: "4px",
                        fontSize: "16px",
                      }}
                    >
                      <ControlPointIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDecreaseQuantity(item._id)}
                      sx={{
                        color: "#ce9d29",
                        padding: "4px",
                        fontSize: "16px",
                      }}
                    >
                      <DoDisturbOnOutlinedIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemoveItem(item._id)}
                      sx={{
                        color: "red",
                        padding: "4px",
                        fontSize: "16px",
                      }}
                    >
                      <HighlightOffIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </ListItem>
                );
              })}
          </List>
          <Button
            onClick={handleOpenUserInfoModal}
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#fbfbfb",
              color: "#ce9d29",
              fontSize: "15px",
              borderRadius: "20px",
              "&:hover": { backgroundColor: "#ce9d29", color: "#fbfbfb" },
            }}
          >
            {t("cart.quoteButton")}
          </Button>
        </Box>
      </Modal>
      <Modal open={userInfoModalOpen} onClose={handleCloseUserInfoModal}>
        <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
          <List
            sx={{
              width: "100%",
              maxHeight: 200,
              overflow: "auto",
              color: "black",
            }}
          >
            {carttwo.items &&
              carttwo.items.map((item) => {
                if (!item.product) {
                  return null;
                }

                const quantity = itemQuantities[item._id] || item.quantity;
                return (
                  <ListItem key={item._id} alignItems="flex-start">
                    <ListItemText
                      primary={
                        <span>
                          {item.product.name}
                          <span
                            style={{
                              marginLeft: "15px",
                              color: "#36454F",
                              fontWeight: "bold",
                            }}
                          >
                            x{" "}
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) =>
                                handleManualQuantityChange(
                                  item._id,
                                  e.target.value
                                )
                              }
                              style={{
                                width: "60px",
                                textAlign: "right",
                                marginLeft: "5px",
                                marginRight: "5px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "2px 4px",
                              }}
                            />{" "}
                            m<sup>3</sup>
                          </span>
                          <br />
                          <span
                            style={{
                              fontSize: "12px",
                              color: "grey",
                              display: "block",
                              marginTop: "5px",
                            }}
                          >
                            REF: {item.product.REF}
                          </span>
                        </span>
                      }
                    />
                  </ListItem>
                );
              })}
          </List>

          <Box sx={{ width: "90%", borderBottom: "1px solid gray" }} />
          <List
            sx={{
              width: "100%",
              maxHeight: 500,
              overflow: "auto",
              color: "black",
            }}
          >
            <Typography
              id="cart-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "gray" }}
            >
{t("cart.userInfoTitle")}            </Typography>
            <TextField
              label={t("cart.fields.name")}
              variant="outlined"
              name="name"
              value={userInfo.name}
              onChange={handleUserInfoChange}
              fullWidth
              sx={{ mt: 2 }}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label={t("cart.fields.surname")}
              variant="outlined"
              name="surname"
              value={userInfo.surname}
              onChange={handleUserInfoChange}
              fullWidth
              sx={{ mt: 2 }}
              error={!!errors.surname}
              helperText={errors.surname}
            />
            <TextField
             label={t("cart.fields.email")}
              variant="outlined"
              name="email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
              fullWidth
              sx={{ mt: 2 }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label={t("cart.fields.phoneNumber")}
              variant="outlined"
              name="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handleUserInfoChange}
              fullWidth
              sx={{ mt: 2 }}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            <TextField
              label={t("cart.fields.message")}
              variant="outlined"
              name="message"
              multiline
              rows={4}
              value={userInfo.message}
              onChange={handleUserInfoChange}
              fullWidth
              sx={{ mt: 2 }}
              error={!!errors.message}
              helperText={errors.message}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#fbfbfb",
                color: "#ce9d29",
                fontSize: "15px",
                borderRadius: "20px",
                "&:hover": { backgroundColor: "#ce9d29", color: "#fbfbfb" },
              }}
            >
              {" "}
              {t("cart.fields.submit")}
               <SendIcon sx={{ ml: 1 }} />{" "}
            </Button>
          </List>
        </Box>
      </Modal>
    </>
  );
}

export default CartIcon;
