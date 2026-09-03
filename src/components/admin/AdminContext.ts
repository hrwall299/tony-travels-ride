import { createContext, useContext } from "react";

export type AdminContextValue = {
  email: string;
  signOut: () => void;
};

export const AdminContext = createContext<AdminContextValue>({
  email: "",
  signOut: () => {},
});

export function useAdmin() {
  return useContext(AdminContext);
}
