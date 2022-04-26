import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import HTMLView from 'react-native-htmlview';
import imagesConstants from '../../../constants/imagesConstants';
import {BoldText, RegularText} from '../Common';
import styles from './style';

export default props => {
  if (props.addMembershipCard) {
    var {Description} = props?.data;
  } else {
    var {InvestigationName} = props?.data;
  }

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.dataSection}>
        {props.addMembershipCard ? (
          <RegularText style={styles.emailText} title={Description} />
        ) : (
          <HTMLView
            textComponentProps={{style: {color: 'black'}}}
            value={InvestigationName}
            stylesheet={styles.htmlText}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
