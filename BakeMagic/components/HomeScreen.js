import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Icon name="camera" size={100} color="#000" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
