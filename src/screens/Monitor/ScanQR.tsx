import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRScanner from './QRScanner';
const dWidth = Dimensions.get('window').width;

const clr1 = 'mediumseagreen';

const ScanQRPage = ({route, navigation}: any) => {
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [isQRScanned, setIsQRScanned] = useState(false);

  const {trashId} = route.params;
  console.log(trashId);

  const openQRscanner = () => {
    setShowQR(true);
  };

  const onQrRead = async (qrtext: any) => {
    setQrCode(qrtext);
    setShowQR(false);
    setIsQRScanned(true);
  };

  console.log('QR CODE ==== ', qrCode);

  return (
    <View style={styles.page}>
      {isQRScanned ? (
        <Text className="text-center font-jakarta text-xl font-semibold text-emerald-600">
          SCAN QR BERHASIL!
        </Text>
      ) : null}
      <Ionicons
        name={'scan-circle-outline'}
        size={qrCode ? dWidth * 0.4 : dWidth * 0.75}
        color={clr1}
      />
      {isQRScanned ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('History')}
          style={styles.btn}>
          <Text style={{color: clr1}}>Cek Riwayat</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => openQRscanner()} style={styles.btn}>
          <Text style={{color: clr1}}>Scan QR</Text>
        </TouchableOpacity>
      )}
      {showQR ? <QRScanner trashId={trashId} onRead={onQrRead} /> : null}
    </View>
  );
};

export default ScanQRPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '3%',
    width: '50%',
    borderWidth: 2,
    borderColor: clr1,
  },
  btnText: {
    color: clr1,
  },
});
