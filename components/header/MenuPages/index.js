import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Link from "next/link";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { getUserData } from "@/components/getUser/getUser";
import transferSpinsToTickets from "@/components/getUser/transferSpins";

import DisabledSpins from "@/components/header/DisabledSpins";

export default function AccountMenu({ userId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userData, setUserData] = useState(null); // Хранение данных пользователя

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const data = await getUserData(userId); // Асинхронный вызов
        setUserData(data); // Сохранение полученных данных в состояние
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleTransferSpinsToTickets = async () => {
    try {
      await transferSpinsToTickets(userData);
      handleClose();
      // После успешной отправки запроса, загружаем данные пользователя заново
      const updatedUserData = await getUserData(userId);
      setUserData(updatedUserData); // Обновляем состояние userData новыми данными
    } catch (error) {
      console.error("Ошибка при передаче spins_waiting в tickets:", error);
    }
  };

  return userData ? (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Badge badgeContent={userData.spins_waiting} color="secondary">
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {userData.login.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Badge>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Link className="w-full flex items-center" href={`/personal`}>
            <Avatar />{" "}
            {userData.login.length > 10
              ? `${userData.login.substring(0, 10)}...`
              : userData.login}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Badge badgeContent={userData.tickets} color="primary">
            <Link className="flex items-center w-full" href={`/fortune`}>
              <ListItemIcon>
                <CurrencyExchangeOutlinedIcon
                  sx={{ width: 20, height: 20 }}
                  className="mr-1"
                />
              </ListItemIcon>
              Fortune wheel
            </Link>
          </Badge>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="flex items-center w-full" href={`/personal`}>
            <ListItemIcon>
              <AccountBalanceWalletOutlinedIcon
                sx={{ width: 20, height: 20 }}
                className="mr-1"
              />
            </ListItemIcon>
            My wallet
          </Link>
        </MenuItem>
        <Divider />

        {userData.spins_waiting > 0 && (
          <MenuItem>
            <ListItemIcon>{userData.spins_waiting}</ListItemIcon>
            {userData.tickets === "0" ? (
              <Button
                onClick={handleTransferSpinsToTickets}
                className="btn-primary"
                variant="contained"
                disabled={userData.tickets > 0}
              >
                Get spins
              </Button>
            ) : (
              <DisabledSpins />
            )}
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  ) : (
    <div></div>
  );
}