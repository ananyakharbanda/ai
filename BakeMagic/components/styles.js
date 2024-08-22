import { StyleSheet } from 'react-native';

const orange = '#FFA500';
const darkTeal = '#008080';

export default StyleSheet.create({
  // Common Styles
  header: {
    backgroundColor: orange,
    padding: 15,
  },
  screenText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Inter',
  },

  // HomeScreen Styles
  homeContainer: {
    flex: 1,
    backgroundColor: darkTeal,
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
    backgroundColor: orange,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#000',
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Inter',
  },

  // RecipeScreen Styles
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: darkTeal,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Inter',
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Inter',
    color: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'Inter',
    color: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
});
