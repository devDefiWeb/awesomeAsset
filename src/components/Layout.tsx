import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline, Toolbar, List, Typography, Divider, IconButton, Badge, Container, Grid, Paper, Box, Input, InputLabel, InputAdornment, FormControl,
  Pagination
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { mainListItems, secondaryListItems } from './ListItems';
import Assets from './Assets';
import { asset } from '../type';
import axios from 'axios';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

interface ILayoutProps {

}

const Layout: React.FC<ILayoutProps> = () => {
  // state
  const [open, setOpen] = useState<boolean>(true);
  const [totalAssets, setTotalAssets] = useState<asset[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const pageSize = 10;

  useEffect(() => {
    async function fetchAssetData() {
      let assetData: asset[] = (await axios.get("https://rest-sandbox.coinapi.io/v1/assets", {
        headers: {
          "X-CoinAPI-Key": "3E82618F-67A3-449E-9B94-7B5E8CD70F1B"
        }
      })).data;
      setTotalAssets(assetData);
    }
    fetchAssetData();
  }, [])

  // methods
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }

  // variables
  const filteredAssetList = totalAssets.filter((asset: asset) => asset.name.indexOf(filter.toUpperCase()) >= 0);

  const assetList = filteredAssetList.slice((page - 1) * pageSize, page * pageSize);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Filter */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Grid container>
                    <Grid item xs={3}>
                      <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                          Asset name
                        </InputLabel>
                        <Input
                          id="input-with-icon-adornment"
                          startAdornment={
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          }
                          value={filter}
                          onChange={handleFilterInputChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                      <h4 style={{ textAlign: 'left' }}>
                        Pick two items to see exchange rate!
                      </h4>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* Assets */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Assets
                      assetList={assetList}
                      pageSize={pageSize}
                    />
                  </Box>
                  <Box m='auto' mt={3}>
                    <Pagination count={Math.ceil(filteredAssetList.length / 10)} page={page} onChange={handlePaginationChange} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider >
  );
}

export default Layout;
