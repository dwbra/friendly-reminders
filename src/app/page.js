import styles from './page.module.scss';
import Home from './components/Home';

export default function Render() {
  return (
    <main className={styles.main}>
      <Home />
    </main>
  );
}
