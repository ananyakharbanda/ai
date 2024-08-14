import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeScreen = ({ route }) => {
  const { apiResponse } = route.params;
  const navigation = useNavigation();

  const { status, message } = apiResponse;
  const parsedMessage = JSON.parse(message);
  const innerStatus = parsedMessage.status;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {status && innerStatus ? (
        <View>
          <Text style={styles.title}>{parsedMessage.recipe.name}</Text>
          <Text style={styles.subtitle}>Ingredients:</Text>
          {parsedMessage.recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.text}>
              - {ingredient}
            </Text>
          ))}
          <Text style={styles.subtitle}>Steps:</Text>
          {parsedMessage.recipe.steps.map((step, index) => (
            <Text key={index} style={styles.text}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>
      ) : status ? (
        <View>
          <Text style={styles.errorText}>
            Couldn't recognize this food item. Please take a clearer picture and
            try again.
          </Text>
          <Button title="Try Again" onPress={() => navigation.goBack()} />
        </View>
      ) : (
        <View>
          <Text style={styles.errorText}>
            Something went wrong. Please try again.
          </Text>
          <Button title="Retry" onPress={() => navigation.goBack()} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Inter',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
});

export default RecipeScreen;
