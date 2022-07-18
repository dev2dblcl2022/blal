import React, {useState, useEffect} from 'react';
import {processColor, TouchableOpacity} from 'react-native';
// import {LineChart} from 'react-native-charts-wrapper';
import colors from '../../../constants/colors';
import {LineChart} from 'react-native-chart-kit';

// styles
import styles from './style';

function LineGraph(props) {
  console.log('props', props);

  const {statistics} = props;
  console.log('statistics', statistics);
  const {data} = statistics;
  console.log('dataa', data);

  let valueSet: {y: number}[] = [];
  let labelSet: {x: number}[] = [];

  // useEffect(() => {
  // }, [data]);

  // setLabelSet(labelSet);
  // setValueSet(valueSet);

  const tempDataPiaGraphSet = data?.map(item => ({
    ...item,
    Value: item.Value * 100,
  }));
  console.log('tempDataPiaGraphSet', tempDataPiaGraphSet);
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
  console.log('dataObj', dataObj);
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
    valueSet = [];
    let graphData = [];
    data?.forEach(item => {
      console.log('item', item);
      valueSet.push({y: item?.Value});

      labelSet.push({x: item.Date});
      graphData.push({
        x: parseFloat(item.Date),
        y: parseFloat(item?.Value),
      });
    });
    console.log('graphDatagraphDatagraphData', graphData);
    console.log('labelSet', labelSet);
    setXaxis({
      valueFormatter: labelSet,
      granularityEnabled: true,
      granularity: 1,
    });

    setDataObj({
      dataSets: [
        {
          label: labelSet,

          data: valueSet,
          // config: {
          //   mode: 'CUBIC_BEZIER',
          //   drawValues: false,
          //   lineWidth: 2,
          //   drawCircles: true,
          //   circleColor: processColor(colors.app_theme_light_green),
          //   drawCircleHole: false,
          //   circleRadius: 5,
          //   highlightColor: processColor(colors.app_theme_light_green),
          //   color: processColor(colors.app_theme_light_green),
          //   drawFilled: true,
          // },
        },
      ],
      // config: {
      //   barWidth: 0.7,
      // },
      //  width:{Dimensions.get("window").width},
      height: 220,
      yAxisLabel: '$',
      yAxisSuffix: 'k',
      yAxisInterval: 1, // optional, defaults to 1

      chartConfig: {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      },
      // bezier,
    });
  }, [props]);
  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [50, 20, 2, 86, 71, 100],
      },
    ],
  };
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <>
      {/* <LineChart
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
      /> */}
      <LineChart
        data={data1}
        // width={screenWidth}
        // height={220}
        bezier
        chartConfig={chartConfig}
      />
    </>
  );
}

export default LineGraph;
