import React, { useContext } from 'react';
import { BookListContext } from './App';
import {
    Alert,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
  import { StatusBar } from "expo-status-bar";
  import { Formik } from "formik";
  import { validationSchema } from "./validation";
  import { styles } from "./FormStyle";
  import FormField from "./FormField";
  import uuid from 'uuid-random';

export function BookEntry({ navigation, route }) {
  // receive state and dispatch from App.js
  const {state, dispatch} = useContext(BookListContext);
  const { params } = route;
  const emptyFormValues = {
    id: "", author: "", title: "", series: "", seriesSequenceNumber: "", source: "", ISBN: "",
    mediaType: "", read: "false", dateRead: "", sourceUri: "", coverImage: ","
  };

  function onSubmitHandler(values) {
    let bookEntry = JSON.parse(JSON.stringify(values));
    if (mode === 'Edit') {
      bookEntry.id = bookData.id;
      dispatch({type: 'Edit', payload: bookEntry});
    } else if (mode === 'Add') {
      bookEntry.id = uuid();
      dispatch({type: 'Add', payload: bookEntry});
    }
    navigation.navigate('BookList');
  }

  function isFormValid(isValid, touched) {
      return isValid && Object.keys(touched).length !== 0;
  }

  if (!params) {
    console.log("In BookEntry: params undefined, returning to BookList");
    navigation.navigate('BookList');
  }
  const { mode, bookData } = params;

  let formHeader;
  let initialFormValues;

  if (mode === 'Add') {
    formHeader = 'Enter Book Data';
    initialFormValues = {...emptyFormValues};
  } else if (mode === 'Edit') {
    formHeader = 'Edit Book Data';
    initialFormValues = {...emptyFormValues, ...bookData};
  } else {
    console.log("BookEntry: invalid mode: " + mode + ", , returning to BookList witn no action");
    navigation.navigate('BookList');
  }

  return (
      <>
      <SafeAreaView style={styles.topSafeArea} />

       <StatusBar style="light" />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{formHeader}</Text>
        </View>

        {/* https://github.com/APSL/react-native-keyboard-aware-scroll-view */}
        <KeyboardAwareScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={150}
        >
          {/* https://formik.org/docs/overview */}
          <Formik
            initialValues={initialFormValues}
            onSubmit={onSubmitHandler}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <FormField
                  field="author"
                  label="Author"
                  autoCapitalize="words"
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <FormField
                  field="title"
                  label="Title"
                  autoCapitalize="words"
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <FormField
                  field="series"
                  label="Series"
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <FormField
                  field="seriesSequenceNumber"
                  label="Series Sequence Number"
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <FormField
                  field="read"
                  label="Read"
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                <TouchableOpacity
                  disabled={!isFormValid(isValid, touched)}
                  onPress={handleSubmit}>
                  <View
                    style={[
                      styles.button,
                      {
                        opacity: isFormValid(isValid, touched) ? 1 : 0.5,
                      },
                    ]}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
       </SafeAreaView>
    </>
  );
}
