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

import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import logo from "../assets/logo.svg"
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { SideBarContext } from "../context/SideBarContext";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { AuthContext } from "../context/AuthContext";
import { getSubjects, getEnrolledSubjects, getTeachedSubjects } from "../api/api";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `${drawerWidth}px`,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const iconMap = {
  Home: <HomeIcon />,
  Calendar: <CalendarTodayIcon />,
  Settings: <SettingsIcon />,
  Group: <GroupIcon sx={{ mr: 1 }} />,
  Class: <SchoolIcon sx={{ mr: 1 }} />
};

export default function Sidebar() {
  const theme = useTheme();

  const { setClassId, classId } = useContext(SideBarContext);

  const [sections, setSections] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const res = await getSubjects();
        const subjects = res.data;

        let teachedSubjects = [];
        try {
          const teachedRes = await getTeachedSubjects(user.id);
          console.log("teach", teachedRes);
          teachedSubjects = teachedRes.data;
          console.log("teach", teachedRes);
        } catch (e) {
          teachedSubjects = [];
          console.log("picis");
        }

        let enrolledSubjects = [];
        try {
          const enrolledRes = await getEnrolledSubjects(user.id);
          enrolledSubjects = enrolledRes.data;
        } catch (e) {
          enrolledSubjects = [];
        }

        const dynamicSections = [
          {
            title: "Cursos que dictas",
            items: teachedSubjects.map((subject) => ({
              to: subject.name,
              label: subject.name,
              iconColor: subject.icon_color || "#1976d2",
              section: subject.section, // <-- add this
            })),
          },
          {
            title: "Cursos inscritos",
            items: enrolledSubjects.map((subject) => ({
              to: subject.name,
              label: subject.name,
              iconColor: subject.icon_color || "#388e3c"
            })),
          },
        ];

        setSections(dynamicSections);
      } catch (err) {
        console.error("Error cargando subjects:", err);
      }
    };

    loadSubjects();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const baseTabs = [`overview`, `work`, `people`];
  const tabRoutes = !user?.is_student ? [...baseTabs, `grades`] : baseTabs;

  const currentTab = tabRoutes.findIndex((route) =>
    location.pathname.includes(route)
  );
  const tabValue = currentTab === -1 ? 0 : currentTab;

  const handleTabChanged = (event, newValue) => {
    navigate(`/class/${classId}/${tabRoutes[newValue]}`);
  };

  const isHome = location.pathname === "/home" || location.pathname === "/";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Topbar */}
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ backgroundColor: theme.palette.background.default, gap: "1rem" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <img src={logo} alt="Logo" style={{ height: 40 }} />
              <Typography variant="h5" noWrap color={theme.palette.text.primary}>
                Classroom
              </Typography>
              <GroupIcon sx={{ color: theme.palette.custom.icons, ml: 1, mr: 1 }} />
              <Link href="#" underline="hover" sx={{ color: theme.palette.text.primary }}>
                <Typography variant="body2" fontWeight="600">{classId}</Typography>
                <Typography variant="caption">01</Typography>
              </Link>
            </Box>
            <Avatar>S</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar permanente */}
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
        variant="permanent"
        anchor="left"
        open
      >
        <DrawerHeader />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/">
              <ListItemIcon>{iconMap["Home"]}</ListItemIcon>
              <ListItemText primary="Página principal" />
            </ListItemButton>

          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/calendar">
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
                    <ListItemText
                      primary={item.label}
                      secondary={item.section}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider />
            </List>
          </Box>
        ))}

        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/">
              <ListItemIcon>{iconMap["Settings"]}</ListItemIcon>
              <ListItemText primary="Configuración" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Main>
        <DrawerHeader />
        {!isHome && (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
        <Box sx={{ pt: isHome ? 0 : 3 }}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
}