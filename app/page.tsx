import styles from "./page.module.css";
import { ExperimentCheck } from "./ExperimentCheck";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ExperimentCheck />
      </main>
    </div>
  );
}
