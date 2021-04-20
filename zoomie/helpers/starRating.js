import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const starRating = (rating) => {
  let color = [];
  for (let i = 0; i < 5; i++) {
    i < Math.round(rating) ? color.push("orange") : color.push("black")
  }
  return (
    <>
      <MaterialCommunityIcons name="star" color={color[0]} style={{ fontSize:17 }}/>
      <MaterialCommunityIcons name="star" color={color[1]} style={{ fontSize:17 }}/>
      <MaterialCommunityIcons name="star" color={color[2]} style={{ fontSize:17 }}/>
      <MaterialCommunityIcons name="star" color={color[3]} style={{ fontSize:17 }}/>
      <MaterialCommunityIcons name="star" color={color[4]} style={{ fontSize:17 }}/>
    </>
  )
}

module.exports = starRating;