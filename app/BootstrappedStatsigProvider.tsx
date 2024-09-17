"use client";

import { signal } from "@preact/signals";
import {
  StatsigProvider,
  StatsigUser,
  useClientBootstrapInit
} from "@statsig/react-bindings";
import { useEffect } from "react";

function useAuth() {
  const auth = signal<StatsigUser | null>(null);

  useEffect(() => {
    auth.value = { userID: "authed-user" };
  }, [auth]);

  return auth;
}

export function BootstrappedStatsigProvider({
  clientSdkKey,
  initialUser,
  initialValues,
  children,
}: {
  clientSdkKey: string;
  initialUser: StatsigUser;
  initialValues: string;
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const client = useClientBootstrapInit(
    clientSdkKey,
    initialUser,
    initialValues,
    {
      networkConfig: {
        logEventUrl: "http://localhost:3000/proxy/rgstr",
        initializeUrl: "http://localhost:3000/proxy/initialize",
      },
      disableCompression: true,
      disableStatsigEncoding: true,
    }
  );

  useEffect(() => {
    const authUser = auth.value;
    if (authUser) {
      client.dataAdapter.prefetchData(authUser).then(() => {
        client.updateUserSync(authUser);
      });
    }
  }, [client, initialUser, auth]);

  return <StatsigProvider client={client}>{children}</StatsigProvider>;
}
