import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from './src/components/NavBar'
import MapComponent from './src/components/MapComponent'
import {useState} from 'react';

export default function Home() {
  
  const [isOpen,setIsOpen] = useState(false)

  return (
    <div className='w-full h-screen'>
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MapComponent isOpen={isOpen}/>
    </div>
  )
}
