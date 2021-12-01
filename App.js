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
Starter app to try out Expo and to answer the question:
What book(s) haven’t I read by author/series/title

So far it just lets you:
	•	list book titles by author/title/series (exact match only) - enter search text and hit return
	•	and filter the list by unread
	•	enter, edit, and delete book details - swipe item left/right for delete/edit
and has in-memory storage only

TODOs
	1.	Clean up UI styles and make it more consistent
  2.  Change read field to a checkbox and store a boolean value
  2.  Add more details to the list displayed, so far it is only the title
  3.  Add error handling - e.g. prevent duplicate entries, etc
	4.	Add persistent storage
	4.	Add case-insensitive search, … more fuzzy search, partial match, suggestions
	5.	Add tests
	6.	Add capture of book details from photo/image of book cover,
      call an OCR api and make sense of what is returned
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