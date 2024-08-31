import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.screenText}>AI-Powered Chef</Text>
      </SafeAreaView>
      <View style={styles.content}>
        <Text style={styles.labelText}>Click for Instant Recipes!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Icon name="camera" size={100} color="#FFA500" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
