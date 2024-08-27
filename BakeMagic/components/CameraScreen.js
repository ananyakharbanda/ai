import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getFontFamily } from '../assets/fonts/helper';

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
      if (permission === 'authorized') {
        setCameraPermission(true);
      } else {
        setCameraPermission(false);
      }
    } else {
      setCameraPermission(false);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  useEffect(() => {
    if (cameraPermission === false) {
      checkCameraPermission(); // Re-check the permission if initially denied
    }
  }, [cameraPermission]);

  // Handle different states before camera is ready
  if (cameraPermission === null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.messageText}>Checking camera permission...</Text>
      </SafeAreaView>
    );
  } else if (!cameraPermission) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.messageText}>
          Grant camera permission in Settings and Restart the app
        </Text>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.messageText}>No camera device available</Text>
      </SafeAreaView>
    );
  }

  const takePhoto = async () => {
    if (!camera.current) {
      return;
    }

    try {
      const photo = await camera.current.takePhoto();
      if (photo) {
        const photoURI = `file://${photo.path}`;
        setCapturedPhoto(photoURI);
        setShowPreview(true);
      }
    } catch (error) {
      Alert.alert('Error', 'There was an issue capturing the photo.');
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
        'https://cooknbake-bzcfcuhdf6c7ehde.southeastasia-01.azurewebsites.net/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setLoading(false);
      navigation.navigate('Recipe', { apiResponse: response.data });
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Upload Failed',
        'There was an issue uploading your picture.',
      );
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
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.screenText}>Capture</Text>
      </SafeAreaView>
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
                <Text style={styles.buttonText}>Use Pic</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          !showPreview && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Text style={styles.buttonText}>Snap</Text>
              </TouchableOpacity>
            </View>
          )
        )}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFA500" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#20B2AA', // Teal background color for message areas
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    color: '#fff', // White text color for contrast
    textAlign: 'center',
    fontFamily: getFontFamily('Inter18pt', '400'), // Use '400' for Regular weight
  },
  header: {
    backgroundColor: '#FFA500', // Orange background for the top text
    padding: 15,
  },
  screenText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black text color
    textAlign: 'center',
    fontFamily: getFontFamily('Inter18pt', '700'), // Use '700' for Bold weight
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000', // Keep the camera view background black
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
    fontWeight: 'normal',
    fontFamily: getFontFamily('Inter18pt', '700'), // Use '700' for Bold weight
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
    fontFamily: getFontFamily('Inter18pt', '400'), // Use '400' for Regular weight
  },
});

export default CameraScreen;
