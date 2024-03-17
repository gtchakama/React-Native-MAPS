import { Text, View } from 'react-native'
import React, { Component, } from 'react'

export class Footer extends Component {
  render() {
    return (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: 20 }}>
        <Text>A side project by George Chakama.</Text>
    </View>
    )
  }
}

export default Footer

