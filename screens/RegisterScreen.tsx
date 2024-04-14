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

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleRegister = async () => {
    try {

      const response = await fetch("http://192.168.100.39:1337/api/v1/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: name,
            email: email,
            password: password,
          },
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        Alert.alert("Registration Successful", "You have been registered successfully.", [
          {
            text: "OK",
            onPress: () => navigate("Login"),
          },
        ]);
      } else {
        Alert.alert("Registration Failed", responseData.message || "An error occurred while registering.");
      }
    } catch (error) {
      Alert.alert("Registration Error", "An error occurred while registering. Please try again later.");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.registerViewContainer}>
          <Text style={styles.header}>Create account</Text>
          <Text style={styles.subtitle}>
            Create an account so you can explore all the existing jobs
          </Text>
        </View>
        <View style={styles.form}>
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
            placeholder="Name"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={name}
            onChangeText={(text) => setName(text)}
          />
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

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Login")} style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account</Text>
        </TouchableOpacity>

        <View style={styles.socialRegister}>
          <Text style={styles.socialRegisterText}>Or continue with</Text>

          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" color={Colors.text} size={Spacing * 2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" color={Colors.text} size={Spacing * 2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" color={Colors.text} size={Spacing * 2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing * 2,
  },
  registerViewContainer: {
    alignItems: "center",
  },
  header: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: Font["poppins-bold"],
    marginVertical: Spacing * 3,
  },
  subtitle: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    maxWidth: "80%",
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
  registerButton: {
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
  registerText: {
    fontFamily: Font["poppins-bold"],
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: FontSize.large,
  },
  loginLink: {
    padding: Spacing,
  },
  loginText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.text,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  socialRegister: {
    marginVertical: Spacing * 3,
  },
  socialRegisterText: {
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
