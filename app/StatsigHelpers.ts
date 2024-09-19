// app/statsig-demo/StatsigHelpers.ts
import Statsig, { LogEventObject, StatsigUser } from "statsig-node";
import { cookies } from "next/headers";

export const STABLE_ID_COOKIE_NAME = "my-companies-stable-id";

// const SERVER_KEY = process.env["statsig_demo_server_key"]!;
// const CLIENT_KEY = process.env["statsig_demo_client_key"]!;

// SDK Demo Keys
const SERVER_KEY = "secret-IiDuNzovZ5z9x75BEjyZ4Y2evYa94CJ9zNtDViKBVdv";
const CLIENT_KEY = "client-rfLvYGag3eyU0jYW5zcIJTQip7GXxSrhOFN69IGMjvq";

const isStatsigReady = Statsig.initialize(SERVER_KEY);

export function getStableId() {
  return cookies().get(STABLE_ID_COOKIE_NAME)?.value;
}

export async function getStatsigValues(
  user: StatsigUser
): Promise<{ values: string; clientSdkKey: string; user: StatsigUser }> {
  await isStatsigReady;

  const values = Statsig.getClientInitializeResponse(user, CLIENT_KEY, {
    hash: "djb2",
  });

  return { values: JSON.stringify(values), clientSdkKey: CLIENT_KEY, user };
}

export async function logEvents(events: LogEventObject[]): Promise<void> {
  await isStatsigReady;

  events.forEach((event) => Statsig.logEventObject(event));
}
