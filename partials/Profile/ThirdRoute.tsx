import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import Font from "../../constants/Font";

const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#ffffff" }]}>
        <Text style={styles.tabText}>Education</Text>
    </View>
);

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontSize: FontSize.large,
        color: Colors.primary,
        fontFamily: Font["poppins-bold"],
    },
});

export default ThirdRoute;
