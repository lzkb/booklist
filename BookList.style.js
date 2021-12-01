import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import {
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
  ROW,
  SECONDARY_TEXT_COLOR,
} from "./style";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  horizontalLeftSection: {
    flexDirection: "column",
    alignItems: 'flex-start',
  },
  horizontalRightSection: {
    flexDirection: "column",
    alignItems: 'flex-end',
  },
  section: {
    flexDirection: "row",
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: 'coral',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: PRIMARY_COLOR,
  },
  item: {
    fontSize: 15,
  },
  listItem: {
    flexDirection: "row",
    margin: 15,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: PRIMARY_TEXT_COLOR,
  },
  author: {
    fontSize: 14,
    color: SECONDARY_TEXT_COLOR,
  },
  series: {
    fontSize: 14,
    color: SECONDARY_TEXT_COLOR,
  },
  seriesNumber: {
    fontSize: 14,
    color: SECONDARY_TEXT_COLOR,
  },
  input: {
    paddingHorizontal: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 0.25,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: 'red',
    right: 0
  }
});