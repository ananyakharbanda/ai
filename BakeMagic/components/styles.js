import { StyleSheet } from 'react-native';

const orange = '#FFA500'; // Solid orange color
const darkTeal = '#008080'; // Darker teal color

export default StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: darkTeal, // Dark teal background color for HomeScreen
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: darkTeal, // Dark teal background color for CameraScreen
  },
  header: {
    backgroundColor: orange, // Orange background for the top text
    padding: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black text color
    textAlign: 'center',
    fontFamily: 'Inter',
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
    backgroundColor: orange, // Solid orange background color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#000', // Black text color
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark transparent overlay
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Inter',
  },
  safeArea: {
    flex: 1,
    backgroundColor: darkTeal, // Dark teal background color for RecipeScreen
  },
  container: {
    padding: 20,
    backgroundColor: darkTeal, // Dark teal background color for RecipeScreen container
  },
  title: {
    fontSize: 28, // Larger font size for the title
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Inter',
    textAlign: 'center', // Center the title
    color: '#fff', // White text color for contrast against orange background
  },
  subtitle: {
    fontSize: 22, // Slightly larger font size for subtitles
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Inter',
    color: '#fff', // White text color for contrast against orange background
  },
  text: {
    fontSize: 18, // Slightly larger font size for text
    marginBottom: 5,
    fontFamily: 'Inter',
    color: '#fff', // White text color for contrast against orange background
  },
  errorText: {
    fontSize: 18,
    color: '#000', // Black text color for error messages
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
});
