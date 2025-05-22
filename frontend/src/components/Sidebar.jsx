import { useEffect, useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Avatar,
  Tabs,
  Tab,
  Link
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import logo from "../assets/logo.svg"
import { getSidebarData } from "../api/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { SideBarContext } from "../context/SideBarContext";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { AuthContext } from "../context/AuthContext";



// #region configuracion de material ui para el componente
const drawerWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
// #endregion

// Iconos disponibles
const iconMap = {
  Home: <HomeIcon />,
  Calendar: <CalendarTodayIcon />,
  Settings: <SettingsIcon />,
  Inbox: <InboxIcon />,
  Mail: <MailIcon />,
  Group: <GroupIcon sx={{ mr: 1 }} />,
  Class: <SchoolIcon sx={{ mr: 1 }} />
};


export default function Sidebar({ children }) {
  const theme = useTheme();

  const { open, setOpen, setClassId, classId } = useContext(SideBarContext)

  const [sections, setSections] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const load = async () => {
      const data = await getSidebarData();
      setSections(data);
    };
    load();
  }, []);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const navigate = useNavigate();
  const location = useLocation();

  const baseTabs = [`overview`, `work`, `people`];
  const tabRoutes = !user?.is_student ? [...baseTabs, `grades`] : baseTabs;

  const currentTab = tabRoutes.findIndex((route) =>
    location.pathname.includes(route)
  );
  const tabValue = currentTab === -1 ? 0 : currentTab; // Valor válido siempre
  const isHome = location.pathname === "/home" || location.pathname === "/";


  const handleTabChanged = (event, newValue) => {
    navigate(`/class/${classId}/${tabRoutes[newValue]}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Topbar */}
      <AppBar position="fixed" open={open} color="primary">
        <Toolbar sx={{ backgroundColor: theme.palette.background.default, gap: "1rem" }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: theme.palette.custom.icons,
              mr: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <img src={logo} alt="Logo" style={{ height: 40 }} />
              <Typography variant="h5" noWrap color={theme.palette.text.primary}>
                Classroom
              </Typography>
              <ChevronRightIcon sx={{ color: theme.palette.custom.icons }} />
              <Link href="#" underline="hover" sx={{ color: theme.palette.text.primary }}>
                <Typography variant="body2" fontWeight="600">Monográfico</Typography>
                <Typography variant="caption">01</Typography>
              </Link>
            </Box>
            <Avatar>S</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: theme.palette.custom.icons }}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        {/* Secciones estáticas */}
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/home">
              <ListItemIcon>{iconMap["Home"]}</ListItemIcon>
              <ListItemText primary="Página principal" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/calendar">
              <ListItemIcon>{iconMap["Calendar"]}</ListItemIcon>
              <ListItemText primary="Calendario" />
            </ListItemButton>

          </ListItem>
        </List>
        <Divider />

        {/* Secciones dinámicas */}
        {sections.map((section, idx) => (
          <Box key={idx}>
            <List>
              {section.title && (
                <ListItem >
                  {idx === 0 && iconMap["Group"]}
                  {idx === 1 && iconMap["Class"]}
                  <ListItemText primary={section.title} />
                </ListItem>
              )}
            </List>
            <List>
              {section.items.map((item, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton onClick={() => setClassId(item.to.replace("/", ""))} component={RouterLink} to={`/class/${item.to.replace("/", "")}/overview`}>
                    <ListItemIcon sx={{ color: item.iconColor || theme.palette.custom.icons }}>
                      {<Avatar sx={{ width: 28, height: 28, backgroundColor: item.iconColor }}>{item.label[0]}</Avatar>}
                    </ListItemIcon>
                    <ListItemText secondary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider />
            </List>
          </Box>
        ))}

        {/* Sección final */}
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon>{iconMap["Settings"]}</ListItemIcon>
              <ListItemText primary="Configuración" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Main open={open}>
        <DrawerHeader />
        {!isHome && (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
            <Tabs value={tabValue} onChange={handleTabChanged}>
              <Tab label="Novedades" />
              <Tab label="Trabajo en clase" />
              <Tab label="Personas" />
              {!user?.is_student && <Tab label="Calificaciones" />}
            </Tabs>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
              <CalendarTodayOutlinedIcon fontSize="small" />
              <AddToDriveOutlinedIcon fontSize="small" />
              <SettingsOutlinedIcon fontSize="small" />
            </Box>
          </Box>
        )}
        {children}
      </Main>
    </Box>
  );
}
