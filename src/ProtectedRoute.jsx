// import React from "react";
// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "./axiosInstance";

// export default function ProtectedRoute({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("/auth/user")
//       .then((res) => {
//         setUser(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setUser(null);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (!user) return <Navigate to="/login" />;
  
//   // Pass user as prop
//   return React.cloneElement(children, { user });
// }

// ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "./axiosInstance";
import Header from "./components/Header";
import Loading from "./components/Loading";
import axiosInstance from "./axiosInstance";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/auth/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading/>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="h-screen overflow-auto">
      <Header  /> 
      {React.isValidElement(children)
        ? React.cloneElement(children, { user })
        : children}
    </div>
  );
}
