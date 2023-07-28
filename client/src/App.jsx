import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Home from './Pages/homePage/Home'
import Login from './Pages/loginPage/Login'
import Profile from './Pages/profilePage/Profile'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import { themeSettings } from './theme'
import { useMemo } from 'react'
import Navbar from './Pages/navbar/Navbar'

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]))
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Route>,
    ),
  )
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
