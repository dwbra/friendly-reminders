// import Image from 'next/image';
import styles from './page.module.css';
import AuthButton from './components/AuthButton';

export default function Home() {
  return (
    <main className={styles.main}>
      <AuthButton />
    </main>
  );
}
