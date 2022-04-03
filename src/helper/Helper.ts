export const objectWithoutKey = (object: any, key: string) => {
	const { [key]: deletedKey, ...otherKeys } = object;
	return otherKeys;
};
