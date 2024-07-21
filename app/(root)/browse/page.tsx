"use client";

import Login from "@/components/shared/login";
import ManageAccount from "@/components/shared/manage-account";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";

const BrowsePage = () => {
  const { account } = useGlobalContext();
  const { data: session } = useSession();

  if (!session) return <Login />;
  if (!account) return <ManageAccount />;

  return <div>BrowsePage</div>;
};

export default BrowsePage;
