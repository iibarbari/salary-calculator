import classNames from 'classnames';
import React from 'react';
import { Header } from '../index';
import styles from './Layout.module.css';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']>;

export default function Layout({ className, children, ...props }: Props) {
  return (
    <div {...props} className={classNames(styles.layout, className)}>
      <Header />

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
