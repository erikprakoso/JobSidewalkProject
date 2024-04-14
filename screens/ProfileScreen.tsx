import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";
import Font from "../constants/Font";

type JobVacancy = {
    id: number;
    attributes: {
        position: string;
        company: string;
        location: string;
        createdAt: string;
    };
};

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");
    const [jobVacancies, setJobVacancies] = useState<JobVacancy[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://192.168.100.39:1337/api/v1/job-vacancies");
            if (response.ok) {
                const data = await response.json();
                setJobVacancies(data.data);
            } else {
                console.error("Failed to fetch job vacancies");
            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        } finally {
            setIsLoading(false); // Setelah selesai fetching, matikan isLoading
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://192.168.100.39:1337/api/v1/job-vacancies?filters[position][$containsi]=${searchText}`);
            if (response.ok) {
                const data = await response.json();
                setJobVacancies(data.data);
            } else {
                console.error("Failed to fetch job vacancies");
            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error);

        } finally {
            setIsLoading(false); // Setelah selesai fetching, matikan isLoading
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.blueBox}>
                <Text style={styles.welcomeText}>Good Night, User 4!</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity onPress={handleSearch}>
                        <Ionicons name="search" size={24} color="white" style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {jobVacancies.map((job) => (
                        <TouchableOpacity
                            key={job.id}
                            style={styles.cardBox}
                            onPress={() => navigation.navigate("JobVacancyDetail", { id: job.id })}
                        >
                            <View style={styles.cardContent}>
                                <Text style={styles.positionText}>{job.attributes.position}</Text>
                                <Text style={styles.companyText}>{job.attributes.company}</Text>
                                <Text style={styles.timeText}>{getPostedTime(job.attributes.createdAt)}</Text>
                                <Text style={styles.locationText}>{job.attributes.location}</Text>
                            </View>
                            <TouchableOpacity style={styles.favoriteButton}>
                                <Ionicons name="bookmark-outline" size={24} color={Colors.primary} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const getPostedTime = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Perbedaan dalam hari
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); // Perbedaan dalam jam
    const diffMinutes = Math.floor(diffTime / (1000 * 60)); // Perbedaan dalam menit

    if (diffDays > 0) {
        return `${diffDays} ${diffDays > 1 ? 'days' : 'day'} ago`;
    } else if (diffHours > 0) {
        return `${diffHours} ${diffHours > 1 ? 'hours' : 'hour'} ago`;
    } else {
        return `${diffMinutes} ${diffMinutes > 1 ? 'minutes' : 'minute'} ago`;
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
    },
    welcomeText: {
        fontSize: FontSize.medium,
        color: Colors.onPrimary,
        marginBottom: 10,
        fontFamily: Font["poppins-regular"],
    },
    blueBox: {
        height: 200,
        backgroundColor: Colors.primary,
        marginBottom: 20,
        padding: 20,
        justifyContent: "center",
    },
    scrollContent: {
        alignItems: "center",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardBox: {
        width: "90%",
        backgroundColor: Colors.onPrimary,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        flex: 1,
    },
    favoriteButton: {
        padding: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
        paddingHorizontal: 10,
        width: "100%",
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: "white",
        fontFamily: Font["poppins-regular"],
    },
    searchIcon: {
        marginLeft: 10,
    },
    positionText: {
        fontSize: FontSize.small,
        color: Colors.text,
        fontFamily: Font["poppins-semiBold"],
    },
    companyText: {
        fontSize: FontSize.xsmall,
        color: Colors.text,
        fontFamily: Font["poppins-regular"],
    },
    timeText: {
        fontSize: FontSize.xxsmall,
        color: Colors.text,
        fontFamily: Font["poppins-regular"],
    },
    locationText: {
        fontSize: FontSize.xsmall,
        color: Colors.text,
        fontFamily: Font["poppins-regular"],
        marginTop: 5,
    },
});

export default ProfileScreen;
