import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { BodyText } from "../components/BodyText";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { NumberContainer } from "../components/NumberContainer";
import { PrimaryButton } from "../components/PrimaryButton.ios";
import { TitleText } from "../components/TitleText";
import Colors from "../constants/colors";
import defaultStyles from "../constants/default-styles";

export const StartGamesScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4)

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={defaultStyles.bodyText}>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <PrimaryButton onPress={() => onStartGame(selectedNumber)}>
          START GAME
        </PrimaryButton>
      </Card>
    );
  }

  useEffect(() => {
    const updateLayout = () => {
        setButtonWidth(Dimensions.get("window").width / 4)
    }

    // Continue get the current Dimension width always
    Dimensions.addEventListener('change', updateLayout)
    return () => {
        Dimensions.removeEventListener('change', updateLayout)
    }
  })

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                blurOnSubmit
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{...styles.button, buttonWidth}}>
                  <Button
                    title="Reset"
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{...styles.button, buttonWidth}}>
                  <Button
                    title="Confirm"
                    color={Colors.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    maxWidth: "90%",
    minWidth: 285,
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    // width: 100,
    maxWidth: "80%",
    // width: Dimensions.get("window").width / 4,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
