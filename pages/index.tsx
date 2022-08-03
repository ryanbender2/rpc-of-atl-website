import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import RPCHead from '../components/RPCHead'
import styles from '../styles/Home.module.css'


export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <RPCHead title="Reformation Presbyterian Church of Atlanta" />

      <main>

      </main>
    </div>
  )
}