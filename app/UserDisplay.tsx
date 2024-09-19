"use client";

import { useStatsigClient } from "@statsig/react-bindings";

export function UserDisplay() {
  const { client } = useStatsigClient();
  const context = client.getContext();

  return (
    <div>
      <div>
        User:
        <pre>{JSON.stringify(context.user, null, 2)}</pre>
      </div>
      <div>
        Stable ID: {context.stableID /* Should be the same as the user */}
      </div>
    </div>
  );
}
