import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { colors } from "../assets/colors"

const Button = ({ title, onPress, color = "primary" ,buttonStyle,textStyle}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors[color] ,...buttonStyle}]}
            onPress={onPress}
            activeOpacity={0.5}
        >
            <Text style={[styles.text,{...textStyle}]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        width: "100%",
        marginVertical: 10,
    },
    text: {
        color: "white",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
})