import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from './src/components/NavBar'
import MapComponent from './src/components/MapComponent'

export default function Home() {
  return (
    <div className='w-full h-screen'>
      <NavBar/>
      <MapComponent/>
    </div>
  )
}
