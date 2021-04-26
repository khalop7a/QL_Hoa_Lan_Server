import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { icons } from '../constants';


export default function Logo() {
  return <Image source={icons.logo} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})
