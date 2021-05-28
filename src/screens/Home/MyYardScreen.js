import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import axios from 'axios';

const MyYardScreen = () => {
    

    useEffect(async () => {
        const res = await axios.put('http://192.168.1.16:8080/api/user/update/aXVrnit7NQaGYl0gRoP7dd0VRI22', data);
        console.log(res.data);
      }, [])

    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default MyYardScreen
