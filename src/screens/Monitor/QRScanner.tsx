import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const QRScanner = (props: any) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      console.log(`onCodeScanned `, codes);
      console.log(`onCodeScanned value`, codes[0].value);
      console.log('TRASH IDDD ==== ', props.trashId);
      props.onRead(codes[0].value);

      axios
        .post(`${process.env.API_URL}/transaksi/tukar-poin/${props?.trashId}`, {
          emailAdmin: codes[0].value,
        })
        .then(res => {
          console.log('RESPONSE SESUDAH SCAN QR ==== ', res.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
  });

  useEffect(() => {
    // exception case
    setRefresh(!refresh);
  }, [device, hasPermission]);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      console.log('Camera.requestCameraPermission ', permission);
      setHasPermission(permission === 'granted');
    };

    requestCameraPermission();

    // //if it is idle for 15 secs, it will be closed
    // setTimeout(() => {
    //   props.onRead(null);
    // }, 15 * 1000);
  }, []);

  if (device == null || !hasPermission) {
    return (
      <View style={styles.page2}>
        <Text style={{backgroundColor: 'white'}}>
          Camera not available or not permitted
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.page2}>
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      <View style={styles.backHeader}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => {
            props.onRead(null);
          }}>
          <Ionicons name={'arrow-back-outline'} size={25} color={'snow'} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text
          style={{
            color: 'snow',
            fontSize: 14,
            fontFamily: 'Plus Jakarta Sans',
          }}>
          Scan QR Code dari petugas!
        </Text>
      </View>
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  page2: {
    flex: 1,
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backHeader: {
    backgroundColor: '#00000090',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: '2%',
    height: '5%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#00000090',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '10%',
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
