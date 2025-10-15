import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthModal } from "./AuthModalProvider";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const { openModal } = useAuthModal();

  useEffect(() => {
    if (!token) {
      openModal(); 
    } else {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiry = payload.exp * 1000;
        if (Date.now() > expiry) {
          localStorage.clear();
          openModal();
        }
      } catch (err) {
        localStorage.clear();
        openModal();
      }
    }
  }, [token, openModal]);

  if (!token) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
