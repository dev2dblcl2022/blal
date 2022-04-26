import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import {BoldText, RegularText} from '../Common';
export default (props, navigation) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <BoldText style={styles.listTitle} title={props.listTitle} />
        {props.seeAll ? (
          <TouchableOpacity onPress={props.onPressSeeAll}>
            <RegularText style={styles.seeAll} title={'See All'} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.flatListSection}>
        <FlatList
          ItemSeparatorComponent={props.ItemSeparatorComponent}
          showsHorizontalScrollIndicator={false}
          data={props.data}
          showsVerticalScrollIndicator={false}
          numColumns={props.numColumns}
          ListEmptyComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <RegularText title={'No Record Found'} />
              </View>
            );
          }}
          extraData={props.extraData}
          horizontal={props.horizontal}
          renderItem={props.renderItem}
        />
      </View>
    </View>
  );
};
