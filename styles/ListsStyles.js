import { StyleSheet } from "react-native";

export default StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 0,
    width: "100%",
    minWidth: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  listItemTitle: {
    fontSize: 16,
  },
  centeredDialog: {
    padding: 0,
    margin: 0,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  listItemImage: {
    alignSelf: "flex-start",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  listItemEditButton: {
    justifyContent: "flex-end",
    marginStart: "auto",
    marginEnd: 0,
    alignSelf: "flex-end",
  },
});
