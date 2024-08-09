import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 100,
  },
  instructions: {
    fontSize: 18,
    fontFamily: 'Inter-Black',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 40,
    marginLeft: 40,
    padding: 100,
    paddingLeft: 100,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    width: '80%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  iconButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
