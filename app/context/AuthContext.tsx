/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { NextRequest, NextResponse } from "next/server";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

interface State {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}
export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      let request  = NextRequest;
      console.log(request);
      // const jwt = cookies().get("jwt")?.value;
      // if (!jwt) {
      //   return setAuthState({
      //     data: null,
      //     error: null,
      //     loading: false,
      //   });
      // }
      // const response = axios.get("http://localhost:1234/api/auth/me", {
      //   headers: {
      //     Authorization: `Bearer ${jwt}`,
      //   },
      // });

      // axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({
        data: null,
        error: null,
        loading: false,
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
