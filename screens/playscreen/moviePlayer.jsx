import React from 'react'
import MoviePlayerScreen from './moviePlayerScreen'
import NowPlayingSection from './nowPlaying'
import { View } from 'react-native'
import { colors } from '../../assets/colors'
const MoviePlayer = ({route}) => {
  return (
        <MoviePlayerScreen route={route}/>
  )
}

export default MoviePlayer