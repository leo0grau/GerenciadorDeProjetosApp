import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';
import styles from './styles';

const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
  const fontSize = isFirst ? 16 : 14;
  const color = isFirst ? 'black' : '#43515c';

  return (
    <TouchableOpacity
      style={[styles.item, {height: reservation.height}]}
      onPress={() => Alert.alert(reservation.name)}>
      <Text style={{fontSize, color}}>{reservation.name}</Text>
    </TouchableOpacity>
  );
};

const renderEmptyDate = () => {
  return (
    <View style={styles.emptyDate}>
      <Text>This is empty date!</Text>
    </View>
  );
};
export default function AgendaPage() {
  const [items, setItems] = useState<any>({});
  const loadItems = (day: DateData) => {
    let aux = items || {};
    for (let i = 0; i < 15; i++) {
      const time = day.timestamp + i;
      const strTime = timeToString(time);

      if (!aux[strTime]) {
        aux[strTime] = [];

        const numItems = 3;
        for (let j = 0; j < numItems; j++) {
          aux[strTime].push({
            name: 'Tarefa ' + j,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: strTime,
          });
        }
      }
    }

    const newItems: AgendaSchedule = {};
    Object.keys(aux).forEach(key => {
      newItems[key] = aux[key];
    });

    setItems(newItems);
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={'2023-12-04'}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
      // markingType={'period'}
      // markedDates={{
      //    '2017-05-08': {textColor: '#43515c'},
      //    '2017-05-09': {textColor: '#43515c'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      // hideExtraDays={false}
      // showOnlySelectedDayItems
      // reservationsKeyExtractor={this.reservationsKeyExtractor}
    />
  );
}
