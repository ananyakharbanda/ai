import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { apiResponse } = route.params;
  const { status, message } = apiResponse;
  const parsedMessage = JSON.parse(message);
  const innerStatus = parsedMessage.status;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {status && innerStatus ? (
          <View>
            <Text style={styles.title}>{parsedMessage.name}</Text>
            <Text style={styles.subtitle}>Ingredients:</Text>
            {parsedMessage.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.text}>
                - {ingredient}
              </Text>
            ))}
            <Text style={styles.subtitle}>Steps:</Text>
            {parsedMessage.steps.map((step, index) => (
              <Text key={index} style={styles.text}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>
        ) : status ? (
          <View>
            <Text style={styles.errorText}>
              Could not recognize the food item. Please try again.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.errorText}>
              Something went wrong. Please try again.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#008080', // Dark teal background color
  },
  container: {
    padding: 20,
    backgroundColor: '#008080', // Dark teal background color
  },
  title: {
    fontSize: 28, // Larger font size for the title
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Inter',
    textAlign: 'center', // Center the title
    color: '#fff', // Optional: Make the title color white for contrast
  },
  subtitle: {
    fontSize: 22, // Slightly larger font size for subtitles
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Inter',
    color: '#fff', // Optional: Make the subtitle color white for contrast
  },
  text: {
    fontSize: 18, // Slightly larger font size for text
    marginBottom: 5,
    fontFamily: 'Inter',
    color: '#fff', // Optional: Make the text color white for contrast
  },
  errorText: {
    fontSize: 18,
    color: '#000', // Black text color for error messages
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  button: {
    backgroundColor: '#FFA500', // Solid orange background color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000', // Black text color
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
});

export default RecipeScreen;
