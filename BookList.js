import React, { useContext, useState } from 'react';
import { BookListContext } from './App';
import {
    Button,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { styles } from "./BookList.style";
import { MyCheckBox } from "./MyCheckBox";

export function BookList({ navigation, route }) {
  // receive state and dispatch from App.js
  const {state, dispatch} = useContext(BookListContext);
  const [text, setText] = useState('');
  const [showBookList, setShowBookList] = useState(false);
  const [filterChecked, setFilterChecked] = useState(false);

  const keyExtractor = (item) => item.id.toString();

  const searchTextEntered = () => {
    setShowBookList(true);
  }

  function searchByText(bookList, text) {
    let displayList = [];

    bookList.forEach(element => {
      if (element.author === text || element.title === text || element.series === text) {
        displayList.push(element);
      }
    });
    return displayList;
  }

  function filterByUnread(bookList) {
    let displayList = [];

    bookList.forEach(element => {
      if (!stringToBool(element.read)) {
        displayList.push(element);
      }
    });
    return displayList;
  }

  function stringToBool(value) {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") {
        return true;
      }
      if (value.toLowerCase() === "false") {
        return false;
      }
    }
    return value;
  }

  const renderItem = data => (
    <View style={styles.rowFront}>
        <Text>{data.item.title}</Text>
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
        <TouchableOpacity onPress={() => editRow(data.item, rowMap)}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.backRightBtn]}
            onPress={() => deleteRow(data.item)}>
          <Text style={{color: '#FFF'}}>Delete</Text>
        </TouchableOpacity>
      </View>
  );

  const deleteRow = (book) => {
    dispatch({type:'Delete', payload: book});
  }

  const editRow = (book, rowMap) => {
    if (rowMap[book.id]) {
      rowMap[book.id].closeRow();
    }
    navigation.navigate('BookEntry', {mode: 'Edit', bookData: book});
  }

  const addBook = () => {
    navigation.navigate('BookEntry', {mode: 'Add', bookData: {}});
  };

  function ListBooks(props) {
    let displayList;

    if (!showBookList) {
      return null;
    }
    displayList = searchByText(state.bookList, text);
    if (filterChecked) {
      displayList = filterByUnread(displayList);
    }
    if (displayList.length == 0) {
      return (
        <Text style={styles.item}>No matches found</Text>
      )
    } else {
      return (
        <SwipeListView
          data={displayList}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.horizontalSection}>
          <TextInput
            value={text}
            style={styles.input}
            placeholder="Search...on author/title/series"
            onChangeText={(text) => {
              setText(text)

              // Q: should this not be done (don't use hooks in if's)?
              // https://reactjs.org/docs/hooks-overview.html
              if (text.length == 0) {
                  setShowBookList(false);
              }
            }}
            onEndEditing={searchTextEntered}
          />
        </View>
        <View style={styles.horizontalSection}>
          <Button style={styles.button}
            title="Add Book"
            onPress = {() => addBook()}/>
        </View>
      </View>
      <View style={styles.section}>
        <MyCheckBox
            checked={filterChecked}
            onChange={setFilterChecked}
            buttonStyle={styles.checkboxBase}
            activeButtonStyle={styles.checkboxChecked}
            inactiveButtonStyle={styles.checkboxBase}
        />
        <Text style={styles.checkboxLabel}>Filter by unread?</Text>
      </View>
      <View style={styles.section}>
        <ListBooks />
      </View>
    </SafeAreaView>
  );
}
