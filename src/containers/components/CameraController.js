import {Platform, Alert} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  check,
  request,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

import Toast from './Toast';

export default class CameraController {
  static async open(cb, isCrop = 0) {
    CameraController.cameraAlert(
      'Select image from...',
      'Camera',
      'Gallery',
      'Cancel',
      statusCamera => {
        if (statusCamera) {
          CameraController.checkPermission(
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.IOS.CAMERA,
            cb,
            isCrop,
            'Camera',
          );
        }
      },
      statusGallery => {
        if (statusGallery) {
          CameraController.checkPermission(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE &&
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            cb,
            isCrop,
            'Gallery',
          );
        }
      },
    );
  }

  static cameraAlert(
    alertMessage,
    Camera,
    Gallery,
    Cancel,
    cbCamera,
    cbGallery,
  ) {
    Alert.alert(
      'Dr.Blal Labs',
      alertMessage,
      [
        {
          text: Camera,
          onPress: () => {
            if (cbCamera) {
              cbCamera(true);
            }
          },
        },
        {
          text: Gallery,
          onPress: () => {
            if (cbGallery) {
              cbGallery(true);
            }
          },
        },
        {
          text: Cancel,
          onPress: () => {
            if (cbCamera) {
              cbCamera(false);
            }
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  static permissionConfirm(alertMessage, cb) {
    Alert.alert(
      'Dr.Blal Labs',
      alertMessage,
      [
        {
          text: 'NOT NOW',
          onPress: () => {
            if (cb) {
              cb(false);
            }
          },
          style: 'cancel',
        },
        {
          text: 'SETTINGS',
          onPress: () => {
            if (cb) {
              cb(true);
            }
          },
        },
      ],
      {cancelable: false},
    );
  }

  static checkPermission = async (
    androidType,
    iosType,
    cb,
    isCrop,
    launchType,
  ) => {
    await check(
      Platform.select({
        android: androidType,
        ios: iosType,
      }),
    ).then(result => {
      if (result === 'granted') {
        // console.log('already allow the camera');
        this.selectImage(cb, isCrop, launchType);
        return;
      } /* limited condition is only work on ios (Select Photos time) */ else if (
        result === 'limited'
      ) {
        this.selectImage(cb, isCrop, launchType);
        return;
      } else if (result === 'blocked' || result === 'unavailable') {
        CameraController.permissionConfirm(
          'Access to the camera has been prohibited please enable it in the Settings app to continue.',
          status => {
            if (status) {
              openSettings().catch(() => {
                console.warn('cannot open settings');
              });
            }
          },
        );
        return;
      }
      request(
        Platform.select({
          android: androidType,
          ios: iosType,
        }),
      ).then(status => {
        if (status === 'granted') {
          // console.log('You can use the camera');
          this.selectImage(cb, isCrop, launchType);
        } /* limited condition is only work on ios (Select Photos time) */ else if (
          status === 'limited'
        ) {
          this.selectImage(cb, isCrop, launchType);
          return;
        } else {
          console.log('camera permission denied');
        }
      });
    });
  };

  static selectImage(cb, isCrop, launchType) {
    if (launchType === 'Camera') {
      if (isCrop) {
        ImageCropPicker.openCamera({
          width: 1000,
          height: 750,
          cropping: true,
          mediaType: 'photo',
          cropperCircleOverlay: isCrop === 2 ? true : false,
          compressImageQuality: 0.2,
          multiple: false,
        })
          .then(response => {
            cb(response);
          })
          .catch(e => {
            console.log('catch image==>', e.message);
            if (e.message === 'User cancelled image selection') {
              Toast('Please select a valid file.', 0);
            }
          });
      } else {
        ImageCropPicker.openCamera({
          mediaType: 'photo',
          compressImageQuality: 0.2,
        })
          .then(response => {
            cb(response);
          })
          .catch(e => {
            if (e.message === 'User cancelled image selection') {
              Toast('Please select a valid file.', 0);
            }
          });
      }
    } else {
      if (isCrop) {
        ImageCropPicker.openPicker({
          width: 1000,
          height: 750,
          cropping: true,
          mediaType: 'photo',
          cropperCircleOverlay: isCrop === 2 ? true : false,
          compressImageQuality: 0.2,
          multiple: false,
        })
          .then(response => {
            cb(response);
          })
          .catch(e => {
            console.log('catch image==>', e.message);
            if (e.message === 'User cancelled image selection') {
              Toast('Please select a valid file.', 0);
            }
          });
      } else {
        ImageCropPicker.openPicker({
          mediaType: 'photo',
          compressImageQuality: 0.2,
        })
          .then(response => {
            cb(response);
          })
          .catch(e => {
            console.log('catch image==>', e.message);
            if (e.message === 'User cancelled image selection') {
              Toast('Please select a valid file.', 0);
            }
          });
      }
    }
  }
}
