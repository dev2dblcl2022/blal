import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import colors from '../../../../constants/colors';
import {RegularText} from '../../../components/Common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Afternoon = () => {
  const [afternoonTime, setAfternoonTime] = useState([
    {id: 1, time: '07:00 - 08:00 AM'},
    {id: 2, time: '07:00 - 08:00 AM'},
    {id: 3, time: '07:00 - 08:00 AM'},
    {id: 4, time: '07:00 - 08:00 AM'},
    {id: 5, time: '07:00 - 08:00 AM'},
    {id: 6, time: '07:00 - 08:00 AM'},
  ]);
  function onSelect(item) {
    let data = afternoonTime;
    data = data.map((itn, index) => {
      if (itn.id == item.id) {
        itn.selected = !itn.selected;
      } else {
        itn.selected = false;
      }
      return itn;
    });
    setAfternoonTime(data);
  }
  return (
    <View>
      <FlatList
        numColumns={2}
        data={afternoonTime}
        extraData={afternoonTime}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={{
                backgroundColor: colors.app_theme_light_green,
                margin: hp('1%'),

                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                borderRadius: 5,
                shadowOpacity: 0.1,
                shadowRadius: 2,

                elevation: 5,
              }}>
              <View
                style={{
                  backgroundColor: item.selected
                    ? colors.app_theme_light_green
                    : colors.white,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginBottom: hp('0.2%'),
                  borderRadius: 5,
                }}>
                <RegularText
                  style={{
                    fontSize: 14,
                    color: item.selected
                      ? colors.white
                      : colors.app_theme_light_green,
                  }}
                  title={item.time}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default Afternoon;
