import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./FormStyle";

export default function FormField({
  field,
  label,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}) {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={values[field]}
        onChangeText={handleChange(field)}
        onBlur={handleBlur(field)}
      />

      {touched[field] && errors[field] ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors[field]}</Text>
        </View>
      ) : null}
    </View>
  );
}
