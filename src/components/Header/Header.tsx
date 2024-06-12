import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { database, dbRef } from '../../components/Database/FirebaseDatabase';
import { onValue } from 'firebase/database'; 
import { Asset, Upload, Address } from '../../models/Asset';

interface DropdownItem {
  href: string;
  text: string;
}

interface NavLink {
  href?: string;
  text: string;
  dropdown?: DropdownItem[];
}

const conditionOrder = ["Urgent Inspection", "Requires Inspection", "Poor", "Good", "Excellent"];

const getCriticalAssets = (uploads: Upload[]): Asset[] => {
  const rows: Asset[] = uploads.map((upload, index) => {
    const location: Address = {
      country: upload.address.country,
      state: upload.address.state,
      city: upload.address.city,
      street: upload.address.street,
      postcode: upload.address.postcode,
    };

    const asset: Asset = {
      name: upload.assetInfo?.assetName || 'N/A',
      number: index + 1,
      condition: upload.assetInfo?.assetCondition || 'N/A',
      material: upload.assetInfo?.assetMaterialType || 'N/A',
      lastInspectionDate: upload.dateInfo?.dateLastInspected || 'N/A',
      lastUploadDate: upload.dateInfo?.dateUploaded || 'N/A',
      location: location,
      inspectionNotes: upload.inspectionNotes?.inspectionNotes || 'N/A',
      photoURLs: upload.photoURLs || [], 
    };

    return asset;
  });

  return rows
    .sort((a, b) => conditionOrder.indexOf(a.condition) - conditionOrder.indexOf(b.condition))
    .slice(0, 5);
};

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [criticalAssets, setCriticalAssets] = useState<Asset[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadsRef = dbRef(database, 'uploads');
    onValue(uploadsRef, (snapshot: any) => {
      const data = snapshot.val();
      const uploadsArray: Upload[] = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      const criticalAssets = getCriticalAssets(uploadsArray);
      setCriticalAssets(criticalAssets);
    });
  }, []);

  const navLinks: NavLink[] = [
    {
      text: "Alerts",
      dropdown: criticalAssets.map(asset => ({
        href: `/details/${asset.name}`,
        text: asset.name
      })),
    },
    { href: "/upload/", text: "Upload" },
    { href: "/status/", text: "Inventory" },   // changed header display to Inventory
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
          sx={{ mr: 1 }}
          onClick={handleLogoClick}
        >
          <img src="/images/logo.png" alt="logo" style={{ width: '35px' }} />
        </IconButton>

        <Typography 
          variant="h6"
          sx={{ flexGrow: 1 }}
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
                    <MenuItem key={idx} onClick={() => { 
                      handleMenuClose(); 
                      const asset = criticalAssets.find(a => a.name === item.text);
                      if (asset) {
                        localStorage.setItem('currentAssetDetails', JSON.stringify(asset));
                      }
                      navigate(item.href); 
                    }}>
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
