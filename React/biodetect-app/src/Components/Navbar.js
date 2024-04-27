import React, { useState, useEffect } from 'react';
import { HiOutlineBars3 } from "react-icons/hi2";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import BarChartIcon from "@mui/icons-material/BarChart";
import Logo from "../Assets/logo.png";


const Navbar = () => {
  const [ openMenu, setOpenMenu ] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setNavbarBackground(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      href: "#home",
    },
    {
      text: "Upload/Detect",
      icon: <BarChartIcon />,
      href: "#detect"
    },
    {
      text: "About",
      icon: <InfoIcon />,
      href: "#about"
    },
  ];
  return (
    <nav className={navbarBackground ? 'navbar scrolled' : 'navbar'}>
      <div className='nav-logo-container'>
      <a className="navbar-brand" href="#">
        <img src={Logo} width="180px" alt='' />
      </a>
      </div>
      <div className='navbar-links-container'>
        <a href="#home">Home</a>
        <a href="#detect">Upload/Detect</a>
        <a href="#about">About</a>
      </div>
      <div className='navbar-menu-container'>
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)}
      anchor='right'>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component="a" href={item.href}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar
