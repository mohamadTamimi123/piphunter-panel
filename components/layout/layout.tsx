"use client";

import React, { useCallback, useEffect } from 'react';
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import { createAuthCookie, deleteAuthCookie, getAuthCookie } from '@/actions/auth.action';
import { RegisterFormType } from '@/helpers/types';
import { router } from 'next/client';

interface Props {
  children: React.ReactNode;
}



export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };
  const getAccount = useCallback(
    async () => {

      const authToken = await getAuthCookie()
      // if (authToken.getValue)
      if (! authToken?.value.length){
        await deleteAuthCookie();
        router.replace("/login");
      }



    },
    [router]
  );

  useEffect(() => {
    getAccount()
  }, []);
  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}>
      <section className='flex'>
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
