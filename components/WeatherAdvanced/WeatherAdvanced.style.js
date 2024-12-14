import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Txt } from "../Txt/Txt";

export const s = StyleSheet.create({
    constainer: {
        flexDirection: 'row',
        backgroundColor: '#0000005c',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 15,

    }
});

export function StyledContainer({ children }) {
    return <View style={{ alignItems: 'center' }}>{children}</View>
}

export function StyledLabel({ children }) {
    return <Txt style={{ fontSize: 15 }}>{children}</Txt>
}

export function StyledValue({ children }) {
    return <Txt style={{ fontSize: 20 }}>{children}</Txt>
}