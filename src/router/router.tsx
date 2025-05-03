import { BrowserRouter, Route, Routes } from "react-router";
import {
  LandingPage,
  Register,
  Dashboard,
  MyGroups,
  NewGroups,
} from "../views";
import { Layout } from "./layout";

export const Router = () => {
  return (
    <BrowserRouter basename="hiveapp">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout authenticated>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/my-groups"
          element={
            <Layout authenticated>
              <MyGroups />
            </Layout>
          }
        />
        <Route
          path="/new-groups"
          element={
            <Layout authenticated>
              <NewGroups />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
