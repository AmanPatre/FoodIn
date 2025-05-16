import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'

const FoodDisplay = () => {

    const {food_list} = useContext( StoreContext)

  return (
    <div>

        <div className="foodDisplay">
            <h2>Top dishes near you </h2>
        </div>
      
    </div>
  )
}

export default FoodDisplay
