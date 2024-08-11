import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, Image, Alert, Linking } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';

const CameraScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const isFocused = useIsFocused();

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    if (status === 'granted') {
      setCameraPermission(true);
    } else if (status === 'notDetermined') {
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

  const confirmPhoto = () => {
    setShowPreview(false);
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setShowPreview(false);
  };

  return (
    <View style={styles.container}>
      {isFocused && cameraPermission && (
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
