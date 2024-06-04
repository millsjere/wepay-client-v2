import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { Routes, Route, Navigate } from "react-router-dom"
import { theme } from './theme.js'
import { connect } from 'react-redux'
import { appRoutes } from './routes';
import PublicRoute from './components/publicRoute/PublicRoute';
import PrivateRoute from './components/privateRoute/PrivateRoute';

import './App.css'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Modal from './components/Modal.js';



const App = ({ modal }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>

        {/* MODAL  */}
        {modal && <Modal status={modal.status} />}
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            {
              appRoutes?.filter(el => !el?.isAuth).map((route, index) => {
                return (
                  <Route key={index} path={route?.path} element={<route.component />} />
                )
              })
            }
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            {
              appRoutes?.filter(el => el?.isAuth).map((route, index) => {
                return (
                  <Route key={index} path={route?.path} element={<route.component />} />
                )
              })
            }
            <Route
              path="*"
              element={<Navigate replace to="/dashboard" />}
            />
          </Route>

        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {})(App);
