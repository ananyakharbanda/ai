import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './styles';

const CameraScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
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

    setLoading(true); // Start loading indicator

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

      setLoading(false); // Stop loading indicator
      navigation.navigate('Recipe', { apiResponse: response.data });
    } catch (error) {
      setLoading(false); // Stop loading indicator on error
      console.error('Upload failed:', error);
      Alert.alert('Upload Failed', 'There was an issue uploading your photo.');
    }
  };

  const confirmPhoto = () => {
    uploadPhoto();
    setShowPreview(false);
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setShowPreview(false);
  };

  return (
    <View style={styles.cameraContainer}>
      {isFocused && cameraPermission && (
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          ref={camera}
          photo={true}
        />
      )}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Processing... Please wait</Text>
        </View>
      ) : showPreview && capturedPhoto ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
          <View style={styles.buttonContainer}>
            <Button title="Retake" onPress={retakePhoto} />
            <Button title="Confirm" onPress={confirmPhoto} />
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
