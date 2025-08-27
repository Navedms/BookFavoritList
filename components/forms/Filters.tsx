import React, { ComponentProps, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import colors from "@config/colors";
import Modal from "../AppModal";
import Text from "../Text";
import { Form, SubmitButton, FormGroupPicker, FormField } from "./index";
import { listType, Sort } from "@store/filters/filtersSlice";

interface FilterItem {
  type: string;
  icon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  id: string;
  name: string;
  list: [];
  placeholder?: string;
  label?: string;
  value: string & string[];
  verticalElementInIT: any;
  borderColor?: string;
}
interface Search {
  firstValue?: unknown;
  name: string;
  width?: string;
  backgroundColor?: string;
  icon?: string;
  border?: number;
  style?: Object;
  textStyle?: Object;
  onChangeCallBack: (text: string) => void;
  placeholder?: string;
  placeholderColor?: string;
  maxLength?: number;
  multiline?: boolean;
  disabled?: boolean;
  pointerEvents?: string;
  onRemoveValue: () => void;
}

interface FiltersProps {
  onSetFilters: (filters: SelectedFilters) => void;
  onResetFilters: () => void;
  onGridListToggle?: (type: listType) => void;
  firstData: FilterItem[];
  defaultFilters: SelectedFilters;
  search: Search;
}

export interface SelectedFilters {
  filters: {
    [key: string]: string | string[];
  };
  sort: Sort;
}

function Filters({
  onSetFilters,
  onResetFilters,
  onGridListToggle,
  firstData,
  defaultFilters,
  search,
}: FiltersProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<FilterItem[]>(firstData);
  const [filterSelect, setFilterSelect] = useState<boolean>(false);
  const [isGridList, setIsGridList] = useState<boolean>(true);
  const width = Dimensions.get("window").width * 0.82;

  useEffect(() => {
    setData(firstData);
    const firstFiltersValues = firstData
      .filter(
        (element) =>
          (element.name === "sorttype" &&
            element.value !== defaultFilters.sort.sorttype) ||
          (element.verticalElementInIT?.name === "sortdirection" &&
            element.verticalElementInIT?.value !==
              defaultFilters.sort.sortdirection)
      )
      .map((filter) => filter.value);

    if (firstFiltersValues.flat().length > 0) {
      setFilterSelect(true);
    } else {
      setFilterSelect(false);
    }
  }, [firstData]);

  const renderFormComponent = (item: FilterItem) => {
    if (item.type === "FormGroupPicker") {
      return (
        <FormGroupPicker
          firstValue={item.value}
          icon={item.icon}
          key={item.id}
          name={item.name}
          list={item.list}
          width={0.9}
          label={item.label}
          verticalElementInIT={item.verticalElementInIT}
        />
      );
    }
    // option to add more types of filter components in the future...
  };

  const validationSchema = Yup.object().shape({});

  const handleSubmit = (filters: any) => {
    const sortAndFilters = {
      sort: {
        sorttype: filters.sorttype,
        sortdirection: filters.sortdirection,
      },
      filters: filters,
    };
    setVisible(false);
    onSetFilters(sortAndFilters);
  };

  const handleGridListToggle = () => {
    setIsGridList((prev) => !prev);
    onGridListToggle?.(isGridList ? "list" : "grid");
  };

  return (
    <Form
      initialValues={{
        ...defaultFilters.filters,
        ...defaultFilters.sort,
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <View style={styles.rowContainer}>
        {onGridListToggle && (
          <TouchableOpacity onPress={handleGridListToggle}>
            <View style={styles.toggleContainer}>
              <MaterialCommunityIcons
                name={
                  isGridList
                    ? "view-grid-outline"
                    : "format-list-bulleted-square"
                }
                size={30}
                color={colors.dark}
                style={[styles.icon, filterSelect && { marginTop: -6 }]}
              />
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.filtersContainer}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <View style={styles.trigerContainer}>
              <MaterialCommunityIcons
                name={filterSelect ? "filter-check-outline" : "filter-outline"}
                size={30}
                color={filterSelect ? colors.primary : colors.dark}
                style={[styles.icon, filterSelect && { marginTop: -6 }]}
              />
            </View>
          </TouchableOpacity>
          {filterSelect && (
            <TouchableOpacity
              onPress={() => {
                onSetFilters(defaultFilters);
                onResetFilters();
              }}
              style={{ justifyContent: "center" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.delete,
                  marginTop: -6,
                }}
              >
                Clean
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {search && (
          <FormField
            firstValue={search.firstValue}
            name={search.name}
            onChangeCallBack={(name, text) => search.onChangeCallBack(text)}
            onRemoveValue={search.onRemoveValue()}
            placeholder={search.placeholder}
            icon={search.icon}
            width={onGridListToggle ? "71.5%" : "84%"}
            disabled={search.disabled}
          />
        )}
      </View>
      <Modal
        visible={visible}
        setVisible={setVisible}
        style={styles.modalStyle}
      >
        <View style={[styles.modalContainer, { width: width }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters:</Text>
          </View>
          {data?.map((item) => renderFormComponent(item))}
          <View style={styles.separatorItems}></View>
          <SubmitButton title="Ok" style={styles.submit} />
        </View>
      </Modal>
    </Form>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: colors.light,
  },
  modalContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  filtersContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  toggleContainer: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  trigerContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
  },
  header: {
    padding: 10,
    marginBottom: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.black,
  },
  icon: {
    paddingHorizontal: 5,
  },
  separator: {
    marginLeft: 8,
    marginRight: -6,
    borderLeftWidth: 1,
    borderColor: colors.medium,
    marginVertical: 10,
  },
  separatorItems: {
    flex: 1,
  },
  submit: {
    marginTop: 20,
  },
});

export default Filters;
