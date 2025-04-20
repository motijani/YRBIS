import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import Colors from "../styles/colors";

const CustomDropdown = ({
  title,
  label,
  value,
  options,
  onSelect,
  multiple,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState(
    multiple ? value || [] : value || ""
  );

  useEffect(() => {
    setSelectedValues(multiple ? value || [] : value || "");
  }, [value]);

  const handleSelectItem = (itemValue) => {
    if (multiple) {
      const currentIndex = selectedValues.indexOf(itemValue);
      const newSelectedValues = [...selectedValues];

      if (currentIndex === -1) {
        newSelectedValues.push(itemValue); // Add selection
      } else {
        newSelectedValues.splice(currentIndex, 1); // Remove selection
      }

      setSelectedValues(newSelectedValues);
      onSelect(newSelectedValues);
    } else {
      setSelectedValues(itemValue);
      onSelect(itemValue);
      setModalVisible(false);
    }
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleSelectItem(item.value)}
    >
      <Text>{item.label}</Text>
      {multiple && selectedValues.includes(item.value) && (
        <Text style={styles.itemSelected}>✓</Text>
      )}
    </TouchableOpacity>
  );

  const getDropdownLabel = () => {
    if (!multiple) {
      return selectedValues ? selectedValues : label;
    }
    if (!selectedValues.length) return label;
    const selectedLabels = options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label);
    return selectedLabels.join(", ");
  };

  return (
    <View style={[styles.containerStyle, { zIndex: modalVisible ? 1000 : 1 }]}>
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.closeButtonText, { color: "black" }]}>
          {getDropdownLabel()}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titleStyle}>{title}</Text>
            <FlatList
              data={options}
              renderItem={renderDropdownItem}
              keyExtractor={(item) => item.value}
              extraData={selectedValues}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: "90%",
    height: 50,
  },
  dropdownContainer: {
    alignSelf: "center",
    borderRadius: 25,
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.Highlight,
    textAlign: "center",
    shadowColor: Colors.Highlight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    backgroundColor: Colors.Secondary,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemSelected: {
    fontFamily: "Aileron-Bold",
    color: "black",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.Secondary,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: Colors.Highlight,
    padding: 20,
    zIndex: 1001,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "maroon",
    borderWidth: 3,
    borderColor: Colors.Highlight,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 40,
    alignSelf: "center",
  },
  closeButtonText: {
    fontFamily: "Aileron-Bold",
    color: Colors.Highlight,
    fontSize: 14,
    opacity: 1,
    alignSelf: "center",
  },
  titleStyle: {
    fontFamily: "Aileron-Bold",
    color: "black",
    fontSize: 18,
    opacity: 1,
    alignSelf: "center",
  },
});

export default CustomDropdown;
