import {Alert} from 'react-native';

const AlertPopup = (title: string, desc: string) =>
  Alert.alert(title, desc, [
    {
      text: 'Oke',
      onPress: () => console.log('Oke pressed'),
    },
  ]);

export default AlertPopup;
