import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

interface DropdownItem {
  href: string;
  text: string;
}

interface NavLink {
  href?: string;
  text: string;
  dropdown?: DropdownItem[];
}

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const navLinks: NavLink[] = [
    {
      text: "Alerts",
      dropdown: [
        { href: "/zone/1", text: "Zone 1" },
        { href: "/zone/2", text: "Zone 2" },
        { href: "/zone/1", text: "Zone 3" },
        { href: "/zone/2", text: "Zone 4" },
      ],
    },
    { href: "/upload/", text: "Upload" },
    { href: "/status/", text: "Status" },
    { href: "/map/", text: "Map" },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    navigate("/")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleLogoClick}
        >
          <img src="/images/logo.png" alt="logo" style={{ width: '30px' }} />
        </IconButton>

        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={handleLogoClick}
        >
          Dashboard
        </Typography>

        <div>
          {navLinks.map((link, index) => (
            link.dropdown ? (
              <React.Fragment key={index}>
                <Button
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                  color="inherit"
                >
                  {link.text}
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {link.dropdown.map((item, idx) => (
                    <MenuItem key={idx} onClick={handleMenuClose}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            ) : (
              <Button key={index} color="inherit" href={link.href}>
                {link.text}
              </Button>
            )
          ))}
        </div>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
