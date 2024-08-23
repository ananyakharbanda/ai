import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const RecipeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { apiResponse } = route.params;
  const { status, message } = apiResponse;
  const parsedMessage = JSON.parse(message);
  const innerStatus = parsedMessage.status;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.screenText}>Recipe</Text>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            <TouchableOpacity
              style={styles.newRecipeButton} // Only show this button when a recipe is found
              onPress={() => navigation.navigate('Camera')}
            >
              <Text style={styles.buttonText}>
                Want another recipe?{'\n'}Click to take new pic!
              </Text>
            </TouchableOpacity>
          </View>
        ) : status ? (
          <View>
            <Text style={styles.errorText}>Unrecognized. Try again.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.errorText}>Error. Try again.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default RecipeScreen;
