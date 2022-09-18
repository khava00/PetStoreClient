import React from 'react'
import NewPet from '../components/NewPet/NewPet'
import Home from '../components/HomePet/Home'
import ListPet from '../components/ListPet/ListPet'
import { Helmet } from 'react-helmet'

const HomePage = () => {
  return (
    <>
      <Home/>
      <NewPet/>
      <ListPet/>
    </>
  )
}

export default HomePage