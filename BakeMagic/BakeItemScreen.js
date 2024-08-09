// import React, { useEffect, useState } from 'react';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { faCamera, faImages } from '@fortawesome/free-solid-svg-icons';
// import Title from './components/Title/Title';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

// const BakeItemScreen = () => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [showCamera, setShowCamera] = useState(false);
//   //const devices = useCameraDevices();

//   const device = Camera.getAvailableCameraDevices('back');
//   console.log('loading');
//   console.log(device);
//   console.log('loaded..');

//   useEffect(() => {
//     const getPermissions = async () => {
//       try {
//         const cameraPermission = await check(PERMISSIONS.IOS.CAMERA);
//         if (cameraPermission !== RESULTS.GRANTED) {
//           const newCameraPermission = await request(PERMISSIONS.IOS.CAMERA);
//           if (newCameraPermission === RESULTS.GRANTED) {
//             setHasPermission(true);
//           } else {
//             setHasPermission(false);
//             Alert.alert(
//               'Permission Denied',
//               'Camera permission is required to use this feature.',
//             );
//           }
//         } else {
//           setHasPermission(true);
//         }
//       } catch (error) {
//         console.error('Permission Error:', error);
//       }
//     };

//     getPermissions();
//   }, []);

//   const openCamera = () => {
//     console.log('Attempting to open camera');
//     if (!hasPermission) {
//       Alert.alert(
//         'Permission Denied',
//         'Camera permission is required to use this feature.',
//       );
//     } else {
//       setShowCamera(true);
//       console.log('Camera should be visible now');
//     }
//   };

//   useEffect(() => {
//     //console.log('Devices: ', devices);
//     console.log('Selected device: ', device);
//     console.log('Has permission: ', hasPermission);
//     console.log('Show camera: ', showCamera);
//   }, [device, hasPermission, showCamera]);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View
//         style={{
//           marginTop: 30,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-around',
//         }}
//       >
//         <Title title={'Take a picture'} />
//         <TouchableOpacity onPress={openCamera}>
//           <FontAwesomeIcon icon={faCameraRetro} />
//         </TouchableOpacity>
//       </View>
//       {device != null && hasPermission && showCamera ? (
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={showCamera}
//         />
//       ) : (
//         <View
//           style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//         >
//           <Text>Camera not available</Text>
//           <Text>Device: {device != null ? 'Available' : 'Not Available'}</Text>
//           <Text>Permission: {hasPermission ? 'Granted' : 'Denied'}</Text>
//           <Text>Show Camera: {showCamera ? 'Yes' : 'No'}</Text>
//         </View>
//       )}
//       <View
//         style={{
//           marginTop: 30,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-around',
//         }}
//       >
//         <Title title={'Choose a picture'} />
//         <TouchableOpacity>
//           <FontAwesomeIcon icon={faImages} />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default BakeItemScreen;

// import React, { useEffect, useState, useRef } from 'react';
// import { Text, View, Button, Image } from 'react-native';
// import {
//   Camera,
//   useCameraDevice,
//   useCameraDevices,
// } from 'react-native-vision-camera';

// const App = () => {
//   const [cameraPermission, setCameraPermission] = useState(null);
//   const device = useCameraDevice('back'); // Set the initial camera device
//   const camera = useRef < Camera > null;
//   const [capturedPhoto, setCapturedPhoto] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const checkCameraPermission = async () => {
//     const status = await Camera.getCameraPermissionStatus();
//     console.log('status', status);

//     if (status === 'granted') {
//       setCameraPermission(true);
//     } else if (status === 'notDetermined') {
//       const permission = await Camera.requestCameraPermission();
//       setCameraPermission(permission === 'authorized');
//     } else {
//       setCameraPermission(false);
//     }
//   };

//   useEffect(() => {
//     checkCameraPermission();
//   }, []);

//   if (cameraPermission === null) {
//     return <Text>Checking camera permission...</Text>;
//   } else if (!cameraPermission) {
//     return <Text>Camera permission not granted</Text>;
//   }

//   if (!device) {
//     return <Text>No camera device available</Text>;
//   }

//   // const camera = useRef<Camera>(null);
//   // const camera = useRef(null);

//   const takePhoto = async () => {
//     try {
//       if (!camera.current) {
//         console.error('Camera reference not available.', camera);
//         return;
//       }

//       const photo = await camera.current.takePhoto();
//       console.log(photo);

//       if (photo) {
//         setCapturedPhoto(`file://${photo.path}`);
//         setShowPreview(true);
//       } else {
//         console.error('Photo captured is undefined or empty.');
//       }
//     } catch (error) {
//       console.error('Error capturing photo:', error);
//     }
//   };

//   const confirmPhoto = () => {
//     // User confirmed, further actions with the captured photo
//     // For example, save the photo to storage, etc.
//     console.log('Photo confirmed:', capturedPhoto);
//     setShowPreview(false); // Hide the preview after confirmation
//   };

//   const retakePhoto = () => {
//     // User wants to retake the photo
//     setCapturedPhoto(null); // Clear the captured photo
//     setShowPreview(false); // Hide the preview
//   };

//   const onCameraReady = ref => {
//     // Camera component is ready, set the camera reference
//     camera.current = ref; // Reference to the Camera component (e.g., obtained from ref prop)
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Camera
//         style={{ flex: 1 }}
//         device={device}
//         isActive={true}
//         ref={ref => onCameraReady(ref)}
//         photo={true}
//         video={true}
//       />
//       {showPreview && capturedPhoto ? (
//         <View
//           style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//         >
//           <Image
//             source={{ uri: capturedPhoto }} // Assuming the photo is a valid URI
//             style={{ width: 300, height: 300, marginBottom: 20 }}
//           />
//           <View
//             style={{ flexDirection: 'row', justifyContent: 'space-between' }}
//           >
//             <Button title="Retake" onPress={retakePhoto} />
//             <Button title="Confirm" onPress={confirmPhoto} />
//           </View>
//         </View>
//       ) : (
//         <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
//           <Button title="Take Photo" onPress={takePhoto} />
//         </View>
//       )}
//     </View>
//   );
// };

// export default App;

import React, { useEffect } from 'react';
import {
  Camera,
  useCameraDevices,
  useCameraPermission,
} from 'react-native-vision-camera';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

const BakeItemScreen = () => {
  const { status, requestPermission } = useCameraPermission();
  const devices = await useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const checkPermission = async () => {
      await requestPermission();
    };

    checkPermission();
  }, []);

  // if (status !== 'authorized') {
  //   return <Text>Requesting camera permission...</Text>;
  // }

  // if (device != null) {
  //   return <Text>No camera device available</Text>;
  // }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </View>
  );
};

export default BakeItemScreen;
