import { BrowserRouter, Route, Routes } from "react-router";
import {
  LandingPage,
  SignUp,
  Dashboard,
  MyGroups,
  NewGroups,
  CreateGroup,
} from "../views";
import { ProtectedView } from "./protected-view";

export const Router = () => {
  return (
    <BrowserRouter basename="hiveapp">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedView>
              <Dashboard />
            </ProtectedView>
          }
        />
        <Route
          path="/my-groups"
          element={
            <ProtectedView>
              <MyGroups />
            </ProtectedView>
          }
        />
        <Route
          path="/new-groups"
          element={
            <ProtectedView>
              <NewGroups />
            </ProtectedView>
          }
        />
        <Route
          path="/create-group"
          element={
            <ProtectedView>
              <CreateGroup />
            </ProtectedView>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
