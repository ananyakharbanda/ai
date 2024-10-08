import { StyleSheet } from 'react-native';
import { getFontFamily } from '../assets/fonts/helper';

// Lighter shades of orange and teal
const lightOrange = '#FFA500'; // A lighter shade of orange
const lightTeal = '#20B2AA'; // A lighter shade of teal

export default StyleSheet.create({
  // Common Styles
  header: {
    backgroundColor: lightOrange,
    padding: 15,
  },
  screenText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontFamily: getFontFamily('Inter18pt', '700'), // Use '700' for Bold weight
  },

  // HomeScreen Styles
  homeContainer: {
    flex: 1,
    backgroundColor: lightTeal,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
  },

  // CameraScreen Styles
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    backgroundColor: lightOrange,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // Black text color
    textAlign: 'center',
    fontFamily: getFontFamily('Inter18pt', '500'),
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
    fontFamily: getFontFamily('Inter18pt', '400'), // Use '400' for Regular weight
  },

  // RecipeScreen Styles
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: lightTeal,
  },
  title: {
    fontSize: 28,
    fontWeight: 'normal',
    marginBottom: 20,
    fontFamily: getFontFamily('Inter18pt', '700'), // Use '700' for Bold weight
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'normal',
    marginBottom: 10,
    fontFamily: getFontFamily('Inter18pt', '600'), // Use '600' for SemiBold weight
    color: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'normal',
    fontFamily: getFontFamily('Inter18pt', '400'), // Use '400' for Regular weight
    color: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: getFontFamily('Inter18pt', '400'), // Use '400' for Regular weight
  },
  labelText: {
    fontSize: 18,
    color: '#000', // Black text color
    textAlign: 'center',
    fontFamily: getFontFamily('Inter18pt', '500'),
    marginBottom: 40, // Increase the space below the label
  },
  newRecipeButton: {
    backgroundColor: lightOrange,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});
