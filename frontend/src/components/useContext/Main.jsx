import { useState } from "react";
import AppRoutes from "../../routes/AppRoutes";
import { CounterProvider } from "./CounterContext";
import { UserProvider } from "./UserContext";
import { ModalProvider } from "./ModalContext";

function Main() {
  return (
    <UserProvider>
      <CounterProvider>
        <ModalProvider>
          <AppRoutes />
        </ModalProvider>
      </CounterProvider>
    </UserProvider>
  );
}

export default Main;
