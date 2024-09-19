"use client";

import { signal } from "@preact/signals";
import {
  StatsigClient,
  StatsigProvider,
  StatsigUser,
} from "@statsig/react-bindings";
import { useEffect, useMemo, useRef } from "react";

const SDK_OPTIONS = {
  networkConfig: {
    logEventUrl: "http://localhost:3000/proxy/rgstr",
    initializeUrl: "http://localhost:3000/proxy/initialize",
  },
  disableCompression: true,
  disableStatsigEncoding: true,
};

type StatsigSetupProps = {
  clientSdkKey: string;
  initialUser: StatsigUser;
  initialValues: string;
};

function useAuthorizeUser() {
  const auth = signal<string | null>(null);

  useEffect(() => {
    auth.value = "authed-user";
  }, [auth]);

  return auth;
}

function useStatsigClientSetup({
  clientSdkKey,
  initialUser,
  initialValues,
}: StatsigSetupProps) {
  const ref = useRef<StatsigClient | null>(null);

  const client = useMemo(() => {
    if (ref.current) {
      return ref.current;
    }

    const client = new StatsigClient(clientSdkKey, initialUser, SDK_OPTIONS);

    ref.current = client;

    client.dataAdapter.setData(initialValues);
    client.initializeSync({
      disableBackgroundCacheRefresh: true, // not required because we are bootstrapping
    });

    return client;
  }, [clientSdkKey, initialUser, initialValues]);

  return client;
}

export function BootstrappedStatsigProvider(
  props: StatsigSetupProps & {
    children: React.ReactNode;
  }
) {
  const auth = useAuthorizeUser();
  const client = useStatsigClientSetup(props);

  useEffect(() => {
    const authUserID = auth.value;
    if (authUserID) {
      const authedUser = JSON.parse(JSON.stringify(props.initialUser)); // Deep clone the initial user object
      authedUser.userID = authUserID; // Only update the userID

      client.dataAdapter
        .prefetchData(authedUser)
        .then(() => {
          client.updateUserSync(authedUser, {
            disableBackgroundCacheRefresh: true, // not required because we are bootstrapping
          });
        })
        .catch(console.error);
    }
  }, [client, props.initialUser, auth]);

  return <StatsigProvider client={client}>{props.children}</StatsigProvider>;
}
