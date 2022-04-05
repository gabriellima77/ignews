/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClass={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClass={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
