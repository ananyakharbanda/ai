import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Linking,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity, // Import TouchableOpacity for custom buttons
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CameraScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    if (status === 'granted') {
      setCameraPermission(true);
    } else if (status === 'not-determined') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'authorized');
    } else {
      setCameraPermission(false);
      Alert.alert(
        'Camera Permission',
        'Camera access is required to take photos. Please enable it in the app settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
        { cancelable: false },
      );
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  if (cameraPermission === null) {
    return <Text>Checking camera permission...</Text>;
  } else if (!cameraPermission) {
    return <Text>Camera permission not granted</Text>;
  }

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  const takePhoto = async () => {
    if (!camera.current) {
      console.error('Camera reference not available.', camera.current);
      return;
    }

    try {
      const photo = await camera.current.takePhoto();
      if (photo) {
        const photoURI = `file://${photo.path}`;
        setCapturedPhoto(photoURI);
        setShowPreview(true);
      } else {
        console.error('Photo captured is undefined or empty.');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const uploadPhoto = async () => {
    if (!capturedPhoto) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', {
      uri: capturedPhoto,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post(
        'http://192.168.1.7:44444/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setLoading(false);
      // Keep showing the captured image even after confirming
      // Only navigate to the next screen when upload is complete
      navigation.navigate('Recipe', { apiResponse: response.data });
    } catch (error) {
      setLoading(false);
      console.error('Upload failed:', error);
      Alert.alert('Upload Failed', 'There was an issue uploading your photo.');
    }
  };

  const confirmPhoto = () => {
    uploadPhoto();
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setShowPreview(false);
  };

  return (
    <View style={styles.cameraContainer}>
      {isFocused && cameraPermission && !showPreview && (
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          ref={camera}
          photo={true}
        />
      )}
      {showPreview && capturedPhoto ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedPhoto }}
            style={styles.fullScreenImage}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={retakePhoto}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={confirmPhoto}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        !showPreview && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )
      )}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Processing... Please wait</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#FFA500', // Solid orange background color
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
});

export default CameraScreen;
