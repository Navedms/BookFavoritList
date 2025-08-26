import React, { useEffect, ComponentProps, ReactNode } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ErrorMessage from "./ErrorMessage";
import colors from "../../config/colors";
import Text from "../Text";

interface Item {
	id: string;
	value?: string;
	icon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
}
interface AppFormGroupPickerProps {
	list: Item[];
	firstValue?: string;
	name: string;
	label?: string;
	border?: number;
	backgroundColor?: string;
	labelColor?: string;
	width?: number;
	fixedPadding?: number;
	disabled?: boolean;
	onChange?: (name: string, value: string) => void;
	style?: Object;
	onClose?: (value: string) => void;
	returnInArry?: boolean;
	verticalElementInIT?: any;
}

function AppFormGroupPicker({
	list,
	firstValue,
	name,
	label,
	border = 1,
	backgroundColor = colors.light,
	labelColor = colors.black,
	width = 1,
	fixedPadding = 40,
	disabled,
	onChange,
	style,
	verticalElementInIT,
	returnInArry = false,
}: AppFormGroupPickerProps) {
	const { setFieldValue, errors, touched, values } = useFormikContext();

	const windowWidth = (Dimensions.get("window").width - fixedPadding) * width;

	const handleFirstValue = (firstValue: string | undefined): void => {
		if (returnInArry) {
			setFieldValue(name, [firstValue]);
		} else {
			setFieldValue(name, firstValue);
		}
	};

	const handleFirstValueInIt = (firstValue: string | undefined): void => {
		if (returnInArry) {
			setFieldValue(verticalElementInIT.name, [firstValue]);
		} else {
			setFieldValue(verticalElementInIT.name, firstValue);
		}
	};

	useEffect(() => {
		handleFirstValue(firstValue);
		if (verticalElementInIT?.value) {
			handleFirstValueInIt(verticalElementInIT.value);
		}
	}, [firstValue, verticalElementInIT?.value]);

	const handleValueChange = (value: string) => {
		onChange && onChange(name, value);
		setFieldValue(name, value);
	};

	const handleValueChangeInIt = (value: string) => {
		onChange && onChange(verticalElementInIT.name, value);
		setFieldValue(verticalElementInIT.name, value);
	};

	return (
		<>
			<View
				style={[
					styles.container,
					style,
					{
						backgroundColor: backgroundColor,
						width: windowWidth,
					},
				]}>
				{label && <Text style={{ color: labelColor }}>{label}</Text>}
				<View style={styles.itemsContainer}>
					{list?.map((item, index) => (
						<TouchableOpacity
							key={item.id}
							style={[
								styles.item,
								{
									width: verticalElementInIT
										? (windowWidth * 0.9) / list.length
										: windowWidth / list.length,
									borderWidth: border,
								},
								index === 0 && {
									borderStartWidth: 1,
									borderTopStartRadius: 8,
									borderBottomStartRadius: 8,
								},
								index === list.length - 1 && {
									borderLeftWidth: border,
									borderTopEndRadius: 8,
									borderBottomEndRadius: 8,
								},
								(item.id === values[name] ||
									(item.id === firstValue &&
										!values[name])) && {
									...styles.selectItem,
								},
							]}
							onPress={() =>
								disabled
									? undefined
									: handleValueChange(item.id)
							}>
							{item.icon && (
								<MaterialCommunityIcons
									name={item.icon}
									size={28}
									color={
										item.id === values[name] ||
										(item.id === firstValue &&
											!values[name])
											? colors.white
											: colors.dark
									}
								/>
							)}
							{item.value && (
								<Text
									style={
										(item.id === values[name] ||
											(item.id === firstValue &&
												!values[name])) && [
											{
												color: colors.light,
												fontWeight: "bold",
											},
										]
									}>
									{item.value}
								</Text>
							)}
						</TouchableOpacity>
					))}
					{verticalElementInIT && (
						<View style={[styles.verticalElementInItContainer]}>
							{verticalElementInIT.list?.map((item, index) => (
								<TouchableOpacity
									style={[
										styles.verticalElementInIT,
										index === 0 && {
											borderTopEndRadius: 8,
											borderTopStartRadius: 8,
											borderBottomWidth: 0,
										},
										index === list.length - 1 && {
											borderLeftWidth: border,
											borderBottomStartRadius: 8,
											borderBottomEndRadius: 8,
											borderTopWidth: 0,
										},
										(item.id ===
											values[verticalElementInIT.name] ||
											(item.id ===
												verticalElementInIT.value &&
												!values[
													verticalElementInIT.name
												])) && {
											...styles.selectItem,
										},
									]}
									key={item.id}
									onPress={() =>
										disabled
											? undefined
											: handleValueChangeInIt(item.id)
									}>
									{item.icon && (
										<MaterialCommunityIcons
											name={item.icon}
											size={20}
											color={
												item.id ===
													values[
														verticalElementInIT.name
													] ||
												(item.id ===
													verticalElementInIT.value &&
													!values[
														verticalElementInIT.name
													])
													? colors.white
													: colors.dark
											}
										/>
									)}
								</TouchableOpacity>
							))}
						</View>
					)}
				</View>
			</View>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "flex-start",
		marginVertical: 10,
		width: "100%",
	},
	icon: {
		marginLeft: 10,
		marginRight: 14,
		marginVertical: 12,
	},
	select: {
		textAlign: "right",
		marginHorizontal: 10,
		color: colors.dark,
		paddingVertical: 14,
	},
	itemsContainer: {
		flexDirection: "row",
		marginTop: 5,
		justifyContent: "flex-start",
		width: "100%",
	},
	item: {
		flexDirection: "row",
		borderStartWidth: 0,
		alignItems: "center",
		justifyContent: "center",
		borderColor: colors.medium,
		paddingHorizontal: 8,
		paddingVertical: 6,
	},
	selectItem: {
		backgroundColor: colors.primary,
	},
	verticalElementInItContainer: {
		flexDirection: "column",
		justifyContent: "center",
		maxHeight: 40,
		marginLeft: 5,
	},
	verticalElementInIT: {
		width: 25,
		borderWidth: 1,
		borderColor: colors.medium,
		alignItems: "center",
	},
});

export default AppFormGroupPicker;
