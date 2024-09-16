// app/statsig-demo/proxy/rgstr/route.ts

import { LogEventObject } from "statsig-node";

import { logEvents } from "../../StatsigHelpers"; // todo: log events with statsig-node

type LogEventBody = {
  events: LogEventObject[];
};

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as LogEventBody;

  await logEvents(body.events);

  return new Response('{"success": true}');
}