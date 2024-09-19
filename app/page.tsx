import styles from "./page.module.css";
import { ExperimentCheck } from "./ExperimentCheck";
import { UserDisplay } from "./UserDisplay";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <UserDisplay />
        <ExperimentCheck experimentName="an_experiment" />
        <ExperimentCheck experimentName="stable_id_experiment" />
      </main>
    </div>
  );
}
