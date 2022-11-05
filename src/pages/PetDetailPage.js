import React from 'react'
import NewPet from '../components/PetDetails/NewPet'
import PetDetails from '../components/PetDetails/PetDetails'
import ReMarks from '../components/PetDetails/ReMarks'

const PetDetailPage = () => {
  return (
    <>
        <PetDetails/>
        <NewPet/> 
        <ReMarks/>    
    </>
  )
}

export default PetDetailPage