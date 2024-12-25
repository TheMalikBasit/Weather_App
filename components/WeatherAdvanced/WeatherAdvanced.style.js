import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderColor: "white",
  },
  item: {
    alignItems: "center",
    marginTop: 50,
  },
  value: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#dcdcdc",
    marginTop: 5,
  },
  unit: {
    fontSize: 13,
    color: "#dcdcdc",
    marginTop: 5,
    fontWeight: "500",
  },
});
