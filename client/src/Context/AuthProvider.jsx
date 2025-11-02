import React, { createContext, useContext, useState } from "react";

// Creating contexts for users and doctors
export const CustomerAuthContext = createContext();
export const AdminAuthContext = createContext();

export default function AuthProvider({ children }) {
  // Getting the current user from local storage
  const currCustomer = localStorage.getItem("Customer");
  const [authCustomer, setAuthCustomer] = useState(
    currCustomer ? JSON.parse(currCustomer) : undefined
  );

  // Getting the current doctor from local storage
  const admin = localStorage.getItem("Admin");
  const [authAdmin, setAuthAdmin] = useState(
    admin ? JSON.parse(admin) : undefined
  );

  return (
    // Nesting the providers to make both contexts available to the children
    <AdminAuthContext.Provider value={[authAdmin, setAuthAdmin]}>
      <CustomerAuthContext.Provider value={[authCustomer, setAuthCustomer]}>
        {children}
      </CustomerAuthContext.Provider>
    </AdminAuthContext.Provider>
  );
}

// Creating custom hooks to access user and doctor contexts easily
export const useAdminAuth = () => useContext(AdminAuthContext);
export const useCustomerAuth = () => useContext(CustomerAuthContext);
