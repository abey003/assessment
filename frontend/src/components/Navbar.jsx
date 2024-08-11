import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EmployeeApp
          </Typography>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">
              <HomeIcon />
            </Button>
          </Link>
          <Link to="/add" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">
              <AddBoxIcon />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
