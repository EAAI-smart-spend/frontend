import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { setCurrency } from "../store/expensesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAvailableCurrencies } from "../utils";

type ManageCurrencyScreenProps = {
  navigation: any;
};

export const ManageCurrencyScreen: React.FC<ManageCurrencyScreenProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.expenses);
  const availableCurrencies = getAvailableCurrencies();

  const handleCurrencyChange = (newCurrency: string) => {
    dispatch(setCurrency(newCurrency));
    Alert.alert("Success", `Currency changed to ${newCurrency}`, [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text variant="bodyMedium" style={styles.description}>
            Select your preferred currency for displaying expenses and budgets.
          </Text>

          <View style={styles.currencyContainer}>
            {availableCurrencies.map((curr) => (
              <List.Item
                key={curr}
                title={curr}
                left={(props) => <List.Icon {...props} icon="currency-usd" />}
                right={(props) =>
                  currency === curr ? (
                    <List.Icon {...props} icon="check" color="#007AFF" />
                  ) : null
                }
                onPress={() => handleCurrencyChange(curr)}
                style={[
                  styles.currencyItem,
                  currency === curr && styles.selectedCurrencyItem,
                ]}
                titleStyle={
                  currency === curr ? styles.selectedCurrencyText : undefined
                }
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  description: {
    color: "#8E8E93",
    marginBottom: 24,
    lineHeight: 20,
  },
  currencyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
  },
  currencyItem: {
    backgroundColor: "#FFFFFF",
  },
  selectedCurrencyItem: {
    backgroundColor: "#F2F2F7",
  },
  selectedCurrencyText: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
