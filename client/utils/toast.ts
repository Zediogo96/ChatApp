import Toast, { ToastType, ToastPosition } from "react-native-toast-message";

export type Toast = {
    title: string;
    message: string;
    type: ToastType;
    position?: ToastPosition;
    visibilityTime?: number;
};

const showFeedbackToast = ({
    title,
    message,
    type,
    position = "bottom",
    visibilityTime = 2500,
}: Toast): void => {
    Toast.show({
        type: type,
        text1: title,
        text2: message,
        position: position,
        visibilityTime: visibilityTime,
    });
};

export default showFeedbackToast;
