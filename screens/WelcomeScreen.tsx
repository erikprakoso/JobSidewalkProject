import { ImageBackground, SafeAreaView, View, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";

const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView>
            <View>
                <ImageBackground
                    style={styles.imageBackground}
                    resizeMode="contain"
                    source={require("../assets/images/welcome-img.png")}
                />
                <View
                    style={styles.container}
                >
                    <Text
                        style={styles.title}
                    >
                        Discover Your Dream Job here
                    </Text>

                    <Text
                        style={styles.subtitle}
                    >
                        Explore all the existing job roles based or your interest and study
                        major
                    </Text>
                </View>
                <View
                    style={styles.containerButton}
                >
                    <TouchableOpacity
                        onPress={() => navigate("Login")}
                        style={styles.loginButton}
                    >
                        <Text
                            style={styles.loginText}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: "4%" }} />
                    <TouchableOpacity
                        // onPress={() => navigate("Register")}
                        style={styles.registerButton}
                    >
                        <Text
                            style={styles.registerText}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    imageBackground: {
        height: height / 1.6,
        width: "100%",
        justifyContent: "center",
        alignSelf: "center",
    },
    container: {
        paddingHorizontal: Spacing * 4,
        paddingTop: Spacing * 4,
    },
    title: {
        fontSize: FontSize.xxLarge,
        color: Colors.primary,
        fontFamily: Font["poppins-bold"],
        textAlign: "center",
    },
    subtitle: {
        fontSize: FontSize.small,
        color: Colors.text,
        fontFamily: Font["poppins-regular"],
        textAlign: "center",
        marginTop: Spacing * 2,
    },
    containerButton: {
        paddingHorizontal: Spacing * 2,
        paddingTop: Spacing * 6,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    loginButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing * 1.5,
        paddingHorizontal: Spacing * 2,
        width: "48%",
        borderRadius: Spacing,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
    },
    loginText: {
        fontFamily: Font["poppins-bold"],
        color: Colors.onPrimary,
        fontSize: FontSize.large,
        textAlign: "center",
    },
    registerButton: {
        borderColor: Colors.primary,
        borderWidth: 1,
        paddingVertical: Spacing * 1.5,
        paddingHorizontal: Spacing * 2,
        width: "48%",
        borderRadius: Spacing,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
    },
    registerText: {
        fontFamily: Font["poppins-bold"],
        color: Colors.text,
        fontSize: FontSize.large,
        textAlign: "center",
    }
})