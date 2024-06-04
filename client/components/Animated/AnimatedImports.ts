import { LinearGradient } from "expo-linear-gradient";
import { ShadowedView } from "react-native-fast-shadow";
import Animated from "react-native-reanimated";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedShadowedView = Animated.createAnimatedComponent(ShadowedView);

export { AnimatedLinearGradient, AnimatedShadowedView };
