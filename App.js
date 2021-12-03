import React, { useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BookList } from './BookList';
import { BookEntry } from './BookEntry';
import { BOOK_LIST } from "./BookListData";

const bookListInitialState = BOOK_LIST;

const Stack = createNativeStackNavigator();
export const BookListContext = React.createContext();

/*
TODOs
	1.	Clean up UI styles and make it more consistent
	2.	Change read field to a checkbox and store a boolean value
	3.	Add more details to the list displayed, so far it is only the title
	4.	Add error handling - e.g. prevent duplicate entries, etc
	5.	Add persistent storage
	6.	Add case-insensitive search, … more fuzzy search, partial match, suggestions
	7.	Add tests
	8.	Add capture of book details from photo/image of book cover, calling an OCR api
*/

export default function App() {
  const [state, dispatch] = useReducer(bookListReducer, bookListInitialState);
  return (
    <BookListContext.Provider value={{state, dispatch}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={BookList}>
          <Stack.Screen name="BookList" component={BookList} options={{title: 'List Books'}}/>
          <Stack.Screen name="BookEntry" component={BookEntry} options={{title: 'Book Details'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </BookListContext.Provider>
  );
}

function bookListReducer(state, action) {
  switch (action.type) {
    case 'Add':
      const addedToBookList = [...state.bookList, action.payload];
      return {...state, bookList:addedToBookList};
    case 'Edit':
      const updatedBook = {...action.payload};
      const updatedBookIndex =
        state.bookList.findIndex(book => book.id === action.payload.id);
      const updatedBookList = [
        ...state.bookList.slice(0, updatedBookIndex),
        updatedBook,
        ...state.bookList.slice(updatedBookIndex + 1)
      ];
      return {...state, bookList: updatedBookList};
    case 'Delete':
      const filteredBookList =
        state.bookList.filter( book => book.id !== action.payload.id);
      return {...state, bookList: filteredBookList};
    default:
      return bookListInitialState;
  }
}