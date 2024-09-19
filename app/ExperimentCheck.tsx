"use client";

import { useStatsigClient } from "@statsig/react-bindings";

export function ExperimentCheck({
  experimentName,
}: {
  experimentName: string;
}) {
  const { client } = useStatsigClient();
  const experiment = client.getExperiment(experimentName);

  return (
    <div>
      <div>Experiment: {experimentName}</div>
      <div>
        Value:
        <pre>{JSON.stringify(experiment.value, null, 2)}</pre>
      </div>
      <div>Reason: {experiment.details.reason}</div>
      <div>Group: {experiment.groupName}</div>
    </div>
  );
}
