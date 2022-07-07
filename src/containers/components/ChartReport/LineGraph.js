import React, {useState, useEffect} from 'react';
import {processColor, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import colors from '../../../constants/colors';

// styles
import styles from './style';

function LineGraph(props) {
  console.log('props', props);
  const {statistics} = props;
  const {netWorth, data} = statistics;
  // const [valueSet, setValueSet] = useState([]);
  // const [labelSet, setLabelSet] = useState([]);
  let valueSet: {y: number}[] = [];
  let labelSet: string[] = [];

  // useEffect(() => {
  // }, [data]);

  // setLabelSet(labelSet);
  // setValueSet(valueSet);

  const tempDataPiaGraphSet = data.map(item => ({
    ...item,
    value: (item.value / netWorth) * 100,
  }));

  const [legend] = useState({
    enabled: false,
    textSize: 14,
    form: 'SQUARE',
    formSize: 14,
    xEntrySpace: 10,
    yEntrySpace: 5,
    formToTextSpace: 5,
    wordWrapEnabled: true,
    maxSizePercent: 0.5,
  });

  const [dataObj, setDataObj] = useState({});

  const [dataPiaGraphSet] = useState(tempDataPiaGraphSet);

  const [highlights] = useState([{x: 0}]);

  // let valueSet = [];
  // let labelSet = [];
  // data?.forEach(item => {
  //   valueSet.push({y: item.value});
  //   labelSet.push(item.label);
  // });

  const [xAxis, setXaxis] = useState({
    valueFormatter: labelSet,
    granularityEnabled: true,
    granularity: 1,
    position: 'BOTTOM',
  });

  // const handleSelect = event => {
  //   const entry = event.nativeEvent;

  //   if (entry) {
  //     // do something with entry
  //     dataPiaGraphSet.forEach((element: any) => {
  //       if (Number(element.info.netWorth) === Number(entry.y)) {
  //         this.props.nav?.navigate('AssetDetail', {
  //           info: element,
  //           isFrom: this.props.isFrom,
  //         });
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    // let labelLength = labelSet.length;
    // data?.forEach(item => {
    //   valueSet.push({y: item.value});
    //   labelSet.push(item.label);
    // });
    // // labelSet.splice(0, labelLength);

    // setXaxis({
    //   valueFormatter: labelSet,
    //   granularityEnabled: true,
    //   granularity: 1,
    // });

    labelSet = [];

    data?.forEach(item => {
      valueSet.push({y: item.value});
      labelSet.push(item.label);
    });

    setXaxis({
      valueFormatter: labelSet,
      granularityEnabled: true,
      granularity: 1,
    });

    setDataObj({
      dataSets: [
        {
          values: valueSet,
          label: 'Reports',
          config: {
            mode: 'CUBIC_BEZIER',
            drawValues: false,
            lineWidth: 2,
            drawCircles: true,
            circleColor: processColor(colors.app_theme_light_green),
            drawCircleHole: false,
            circleRadius: 5,
            highlightColor: processColor(colors.app_theme_light_green),
            color: processColor(colors.app_theme_light_green),
            drawFilled: true,
          },
        },
      ],
      config: {
        barWidth: 0.7,
      },
    });
  }, [props]);
  return (
    <>
      {/* <TouchableOpacity onPress={onChnage}>
        <Text>{'Change'}</Text>
      </TouchableOpacity> */}

      <LineChart
        style={styles.chart}
        data={dataObj}
        xAxis={xAxis.valueFormatter ? xAxis : null}
        legend={legend}
        highlights={highlights}
        chartDescription={{text: ''}}
        pinchZoom={false}
        doubleTapToZoomEnabled={false}
        animation={{
          durationX: 0,
          durationY: 1500,
          easingY: 'EaseInOutQuart',
        }}
        gridBackgroundColor={processColor('#ffffff')}
        visibleRange={{x: {min: 3, max: 5}}}
        marker={{
          enabled: true,
          markerColor: processColor(colors.app_theme_light_green),
          textColor: processColor(colors.white),
        }}
        // onSelect={this.handleSelect}
        onChange={event => {
          console.log('onChange:', event.nativeEvent);
        }}
      />
    </>
  );
}

export default LineGraph;
