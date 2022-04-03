import React, { memo } from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import CreateNewListTextInput from "./CreateNewListTextInput";

function CreateNewListDialog({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
	console.log("rerender CreateNewListDialog");
	const textInputRef = React.useRef();

	function okPress() {
		// @ts-ignore
		textInputRef?.current?.createNewList();
		onDismiss();
	}

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>Neue Liste hinzufügen</Dialog.Title>
				<Dialog.Content>
					<CreateNewListTextInput ref={textInputRef} />
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={okPress}>Ok</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

export default memo(CreateNewListDialog);
