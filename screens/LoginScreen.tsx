import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {

    try {
      const response = await fetch("http://192.168.100.39:1337/api/v1/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            email: email,
            password: password,
          },
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const accountId = responseData.data.attributes.id.toString();
        await AsyncStorage.setItem('account-key', accountId);
        Alert.alert("Login Successful", "You have been logged in successfully.", [
          {
            text: "OK",
            onPress: () => navigate("MainTabNavigator"),
          },
        ]);
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.error ? responseData.error.message : "An error occurred while logging in.";
        Alert.alert("Login Failed", errorMessage);
      }
    } catch (error) {
      Alert.alert("Login Error", "An error occurred while logging in. Please try again later.");
    }

  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={styles.loginViewContainer}
        >
          <Text style={styles.header}>
            Login here
          </Text>
          <Text
            style={styles.subtitle}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View
          style={styles.form}
        >
          <TextInput
            style={[
              styles.input,
              focus && {
                borderWidth: 3,
                borderColor: Colors.primary,
                shadowOffset: { width: 4, height: Spacing },
                shadowColor: Colors.primary,
                shadowOpacity: 0.2,
                shadowRadius: Spacing,
              },
            ]}
            placeholder="Email"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[
                styles.input,
                focus && {
                  borderWidth: 3,
                  borderColor: Colors.primary,
                  shadowOffset: { width: 4, height: Spacing },
                  shadowColor: Colors.primary,
                  shadowOpacity: 0.2,
                  shadowRadius: Spacing,
                },
              ]}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.showHideButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                color={Colors.primary}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigate("ForgotPassword")}
        >
          <View>
            <Text
              style={styles.forgotPasswordLink}
            >
              Forgot your password ?
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text
            style={styles.loginText}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Register")}
          style={styles.registerLink}
        >
          <Text
            style={styles.registerText}
          >
            Create new account
          </Text>
        </TouchableOpacity>

        <View
          style={styles.socialLogin}
        >
          <Text
            style={styles.socialLoginText}
          >
            Or continue with
          </Text>

          <View
            style={styles.socialIcons}
          >
            <TouchableOpacity
              style={styles.socialButton}
            >
              <Ionicons
                name="logo-google"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
            >
              <Ionicons
                name="logo-apple"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
            >
              <Ionicons
                name="logo-facebook"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing * 2,
  },
  loginViewContainer: {
    alignItems: "center",
  },
  header: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: Font["poppins-bold"],
    marginVertical: Spacing * 3,
  },
  subtitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.large,
    maxWidth: "60%",
    textAlign: "center",
  },
  form: {
    marginVertical: Spacing * 3,
  },
  input: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
  },
  forgotPasswordLink: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.small,
    color: Colors.primary,
    alignSelf: "flex-end",
  },
  loginButton: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
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
    textAlign: "center",
    fontSize: FontSize.large,
  },
  registerLink: {
    padding: Spacing,
  },
  registerText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.text,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  socialLogin: {
    marginVertical: Spacing * 3,
  },
  socialLoginText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.primary,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  socialIcons: {
    marginTop: Spacing,
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    padding: Spacing,
    backgroundColor: Colors.gray,
    borderRadius: Spacing / 2,
    marginHorizontal: Spacing,
  },
  passwordInputContainer: {
    position: "relative",
  },
  showHideButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -Spacing }],
  },
});
