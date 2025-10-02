import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type OnboardingScreenProps = {
  navigation: any;
};

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
}) => {
  const handleGetStarted = () => {
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <View style={styles.topSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>💰</Text>
          </View>
          <Text variant="headlineLarge" style={styles.title}>
            Welcome to SmartSpend
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Track your expenses effortlessly and gain insights into your
            spending habits.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text variant="titleMedium" style={styles.featureTitle}>
              Visual Analytics
            </Text>
            <Text variant="bodyMedium" style={styles.featureDescription}>
              See your spending patterns with beautiful charts and graphs.
            </Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏷️</Text>
            <Text variant="titleMedium" style={styles.featureTitle}>
              Smart Categories
            </Text>
            <Text variant="bodyMedium" style={styles.featureDescription}>
              Organize expenses with customizable categories.
            </Text>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleGetStarted}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Get Started
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
    marginTop: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  iconText: {
    fontSize: 60,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#000000",
  },
  subtitle: {
    textAlign: "center",
    color: "#8E8E93",
    paddingHorizontal: 20,
  },
  featuresSection: {
    flex: 1,
    justifyContent: "center",
    gap: 24,
  },
  feature: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  featureTitle: {
    fontWeight: "600",
    marginBottom: 4,
    color: "#000000",
  },
  featureDescription: {
    textAlign: "center",
    color: "#8E8E93",
  },
  button: {
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: "#007AFF",
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: "600",
    textTransform: "none",
  },
});
