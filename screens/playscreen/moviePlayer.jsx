import React from 'react'
import MoviePlayerScreen from './moviePlayerScreen'
import NowPlayingSection from './nowPlaying'
import { View } from 'react-native'
import { colors } from '../../assets/colors'
const MoviePlayer = ({route}) => {
  return (
    <View style={{backgroundColor:colors.black}}> 
        <MoviePlayerScreen route={route}/>
        <NowPlayingSection/>
    </View>
  )
}

export default MoviePlayer