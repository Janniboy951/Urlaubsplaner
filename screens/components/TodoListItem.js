import React from "react";
import { View, Alert } from "react-native";
import { List, IconButton } from "react-native-paper";
import { CheckBox, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Button, Dialog, Portal } from "react-native-paper";
import styles from "../../styles/TodoListItem";

export const TodoListItem = ({
  title,
  forceCamera,
  winterOnly,
  itemNum,
  partNum,
  itemState,
  itemImgUri,
  season,
  onDataChange,
}) => {
  const [boxChecked, setBoxChecked] = React.useState(itemState);
  const switchBoxChecked = async () => {
    setBoxChecked(!boxChecked);
    await handleDataChange(!boxChecked);
  };
  const [buttonImage, setButtonImage] = React.useState(
    itemImgUri == undefined ? "camera" : "image-outline"
  );
  const [documentationImage, setDocumentationImage] =
    React.useState(itemImgUri);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const hideDialog = () => setDialogVisible(false);
  const [checkBoxDisabled, setCheckBoxDisabled] = React.useState(
    itemImgUri != undefined
  );

  const handleDataChange = async (
    checkBoxState = null,
    documentationImageUri = "placeholder"
  ) => {
    let dataToPass = {
      partNum: partNum,
      itemNum: itemNum,
      title: title,
      state: boxChecked,
      imgUri: documentationImage,
    };
    if (checkBoxState != undefined) {
      dataToPass.state = checkBoxState;
    }
    if (documentationImageUri != "placeholder") {
      dataToPass.imgUri = documentationImageUri;
    }
    if (dataToPass.imgUri != undefined && !dataToPass.state) {
      dataToPass.imgUri = null;
    }
    await onDataChange(dataToPass);
  };

  //console.log(itemImgUri);

  const takePicture = async () => {
    if (
      (await (await ImagePicker.getCameraPermissionsAsync()).granted) == false
    ) {
      await ImagePicker.requestCameraPermissionsAsync();
    }

    let img = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
    if (!img.cancelled) {
      setBoxChecked(true);
      setDocumentationImage(img.uri);
      setCheckBoxDisabled(true);
      setButtonImage("image-outline");
      await handleDataChange(true, img.uri);
    }
  };

  if (winterOnly && season == "summer") {
    return null;
  }

  // if (documentationImage != undefined) {
  //   setCheckBoxDisabled(true);
  //   setButtonImage("image-outline");
  // }
  //console.log("Rendering Item");
  //handleDataChange();
  return (
    <List.Item
      title={title}
      right={(props) => (
        <View style={{ flexDirection: "row" }}>
          <Portal>
            <Dialog visible={dialogVisible} onDismiss={hideDialog}>
              <Dialog.Title style={styles.centeredDialog}>{title}</Dialog.Title>
              <Dialog.Content style={styles.centeredDialog}>
                <Image
                  resizeMode="contain"
                  source={{ uri: documentationImage }}
                  style={{
                    width: "90%",
                    // height: undefined,
                    aspectRatio: 16 / 16,
                    //height: 500,
                  }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  color="#f00"
                  onPress={() =>
                    Alert.alert(
                      "Löschen Bestätigen",
                      'Möchten sie das Bild von \n"' +
                        title +
                        '"\n wirklich löschen?',
                      [
                        {
                          text: "Abbrechen",
                          style: "cancel",
                        },
                        {
                          text: "Löschen",
                          onPress: async () => {
                            setButtonImage("camera");
                            setDocumentationImage(undefined);
                            setBoxChecked(false);
                            setCheckBoxDisabled(false);
                            hideDialog();
                            await handleDataChange(false, undefined);
                          },
                          style: "destructive",
                        },
                      ],
                      {
                        cancelable: true,
                      }
                    )
                  }
                >
                  Löschen
                </Button>
                <Button onPress={hideDialog}>Schließen</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <IconButton
            icon={buttonImage}
            onPress={async () => {
              if (buttonImage == "camera") {
                takePicture();
              } else {
                setDialogVisible(true);
              }
            }}
          />
          {forceCamera ? null : (
            <CheckBox
              checked={boxChecked}
              disabled={checkBoxDisabled}
              onPress={switchBoxChecked}
            />
          )}
        </View>
      )}
    />
  );
};
