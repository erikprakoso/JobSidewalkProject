import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../types";
  import AppTextInput from "../components/AppTextInput";
  
  type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;
  
  const ForgotPasswordScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
      <SafeAreaView>
        <View
          style={{
            padding: Spacing * 2,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xLarge,
                color: Colors.primary,
                fontFamily: Font["poppins-bold"],
                marginVertical: Spacing * 3,
              }}
            >
              Forgot Password
            </Text>
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                fontSize: FontSize.large,
                maxWidth: "60%",
                textAlign: "center",
              }}
            >
              Enter your email address to reset your password
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          >
            <AppTextInput placeholder="Email" />
          </View>
          <TouchableOpacity
            style={{
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
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              padding: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Back to login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default ForgotPasswordScreen;
  
  const styles = StyleSheet.create({});
  