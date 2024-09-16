"use client";

import { useStatsigClient } from "@statsig/react-bindings";


export function ExperimentCheck() {
  const { client } = useStatsigClient();
  const experiment = client.getExperiment('an_experiment');

  return <div>
    <div>{JSON.stringify(experiment.value)}</div>
    <div>{experiment.details.reason}</div>
    <div>{experiment.groupName}</div>
  </div>;
}