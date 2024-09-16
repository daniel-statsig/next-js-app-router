"use client";

import {
  StatsigProvider,
  StatsigUser,
  useClientBootstrapInit,
} from "@statsig/react-bindings";
import { useEffect, useState } from "react";

function useAuth() {
  const [auth, setAuth] = useState<StatsigUser | null>(null);

  useEffect(() => {
    setTimeout(async () => {
      setAuth({ userID: "authed-user" });
    }, 1000);
  }, []);

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
    if (auth) {
      client.dataAdapter.prefetchData(auth).then(() => {
        client.updateUserSync(auth);
      });
    }
  }, [client, initialUser, auth]);

  return <StatsigProvider client={client}>{children}</StatsigProvider>;
}
