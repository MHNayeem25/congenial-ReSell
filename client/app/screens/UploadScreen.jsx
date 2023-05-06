import { Modal, StyleSheet, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import colors from "../config/colors";

import LottieView from "lottie-react-native";

const UploadScreen = ({ onDone, progress = 0, visible = false }) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar
            progress={progress}
            color={colors.primary}
            width={200}
          />
        ) : (
          <View style={styles.animationContainer}>
            <LottieView
              onAnimationFinish={onDone}
              autoPlay
              loop={false}
              style={styles.animation}
              source={require("../assets/animations/done.json")}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  animationContainer: {
    width: 200,
  },
  animation: {
    width: 200,
    resizeMode: "cover",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
