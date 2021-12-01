import React from 'react';
import {
  Pressable,
  StyleSheet} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export function MyCheckBox({
  checked,
  onChange,
  buttonStyle = {},
  activeButtonStyle = {},
  inactiveButtonStyle = {},
  activeIconProps = {},
  inactiveIconProps = {}
  }) {

  function onCheckmarkPress() {
    onChange(!checked);
  }

  const iconProps = checked ? activeIconProps : inactiveIconProps;
  return (
    <Pressable
      style={[
        buttonStyle,
        checked
          ? activeButtonStyle
          : inactiveButtonStyle
        ]}
        onPress={onCheckmarkPress}>
        {checked && (
          <Ionicons
            name="checkmark"
            size={24}
            color="white"
            {...iconProps}
          />
        )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
});