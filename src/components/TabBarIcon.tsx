import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';


interface Props {
    focused: boolean;
    color: string;
    name: string;
}

export const TabBarIcon = ({ focused, color, name}:Props) => {
  return (
    <Icon 
        color={ color }
        size={  25 }
        name={ focused ? name : `${ name }-outline`}
    />
  )
}
