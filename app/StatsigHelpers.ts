// app/statsig-demo/StatsigHelpers.ts

import Statsig, { LogEventObject, StatsigUser } from "statsig-node";

const isStatsigReady = Statsig.initialize(process.env['statsig_demo_server_key']!);

const clientSdkKey = process.env['statsig_demo_client_key']!;

export async function getStatsigValues(
  user: StatsigUser
): Promise<{ values: string; clientSdkKey: string; user: StatsigUser }> {
  await isStatsigReady;

  const values = Statsig.getClientInitializeResponse(user, clientSdkKey, {
    hash: "djb2",
  });

  return { values: JSON.stringify(values), clientSdkKey, user };
}

export async function logEvents(events: LogEventObject[]): Promise<void> {
  await isStatsigReady;

  events.forEach((event) => Statsig.logEventObject(event));
}
