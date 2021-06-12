import React from "react";
import { View, TouchableOpacity } from "react-native";
import { TextInput, Text, Button, RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { readAsStringAsync, EncodingType } from "expo-file-system";
import { convertCsvToJson } from "../helper/CsvConverter";
import { getList, saveList } from "../helper/DataManager";
import Icon from "react-native-vector-icons/MaterialIcons";
const standartIMG = "../assets/chooseFromGallery.png";
import Toast from "react-native-toast-message";

async function selectImage() {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });
  if (pickerResult.cancelled != true) {
    return pickerResult.uri;
  } else {
    return null;
  }
}

export default function AddListScreen({ navigation }) {
  const [listName, setListName] = React.useState("");
  const [listDescription, setListDescription] = React.useState("");
  const [listImage, setListImage] = React.useState(standartIMG);
  const [summerWinter, setSummerWinter] = React.useState("summer");
  var todos = undefined;

  return (
    <KeyboardAwareScrollView
      style={{ height: "100%" }}
      contentContainerStyle={{
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
      enableOnAndroid={true}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "100%",
          width: "100%",
          flex: 1,
        }}
      >
        <TextInput
          style={{ width: "90%", marginTop: "5%" }}
          label="Name"
          value={listName}
          onChangeText={(text) => setListName(text)}
        />
        <TextInput
          style={{ width: "90%", marginTop: "3%" }}
          label="Beschreibung"
          value={listDescription}
          onChangeText={(text) => setListDescription(text)}
        />

        {/* <RadioButton.Group
          layout="row"
          size={24}
          thickness={2}
          onValueChange={(newValue) => setSummerWinter(newValue)}
          value={summerWinter}
        >
          <View>
            <View style={{ flexDirection: "row", marginTop: "3%" }}>
              <RadioButton.Item
                style={{}}
                position="leading"
                label="Sommer"
                value="summer"
              />

              <RadioButton.Item
                position="leading"
                label="Winter"
                value="winter"
              />
            </View>
          </View>
        </RadioButton.Group> */}

        <TouchableOpacity
          style={{ marginTop: "3%" }}
          onPress={async () => {
            let source = await selectImage();
            if (source != null) {
              setListImage(source);
            }
          }}
        >
          <Image
            resizeMode="cover"
            style={{
              width: 150,
              height: 150,
              marginTop: "3%",
              borderRadius: 150 / 2,
            }}
            source={{ uri: listImage }}
            //
          />
        </TouchableOpacity>
        <Button
          style={{ marginTop: "3%", marginBottom: "5%" }}
          icon="file"
          mode="contained"
          onPress={async () => {
            let csvFile = await DocumentPicker.getDocumentAsync({
              type: "text/csv",
            });
            let csvContent = await readAsStringAsync(csvFile.uri, {
              encoding: EncodingType.UTF8,
            });
            todos = convertCsvToJson(csvContent);
          }}
        >
          CSV importieren
        </Button>

        <Button
          style={{ marginTop: "3%" }}
          icon="playlist-check"
          mode="contained"
          onPress={async () => {
            if (listName == "") {
              Toast.show({
                type: "error",
                text1: "Erstellen der Liste nicht möglich",
                text2: "Bitte füge einen Namen hinzu!",
              });
              return;
            }
            if (todos == undefined) {
              Toast.show({
                type: "error",
                text1: "Erstellen der Liste nicht möglich",
                text2: "Bitte füge Todos über eine CSV Datei hinzu!",
              });
              return;
            }
            if ((await getList(listName)) != undefined) {
              Toast.show({
                type: "error",
                text1: "Erstellen der Liste nicht möglich",
                text2: "Bitte verwende einen noch nicht verwendeten Namen!",
              });
              return;
            }
            let todoList = {
              listName: listName,
              listDescription: listDescription,
              listImage: listImage,
              listTodos: todos,
            };
            await saveList(JSON.parse(JSON.stringify(todoList)));
            // Toast.show({
            //   type: "success",
            //   text1: "Liste erstellt!",
            // });
            navigation.navigate("lists");
          }}
        >
          Liste hinzufügen
        </Button>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAwareScrollView>
  );
}
