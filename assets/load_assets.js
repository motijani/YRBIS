import { useFonts } from "expo-font";

export const loadAssets = () => {
  const [fontsLoaded] = useFonts({
    "NexaDemo-Light": require("../assets/fonts/NexaDemo-Light.otf"),
    "NexaDemo-Bold": require("../assets/fonts/NexaDemo-Bold.otf"),
    "Figtree-Bold": require("../assets/fonts/Figtree-Bold.ttf"),
    "Aileron-LightItalic": require("../assets/fonts/Aileron-LightItalic.otf"),
    "Aileron-Light": require("../assets/fonts/Aileron-Light.otf"),
    "Aileron-Thin": require("../assets/fonts/Aileron-Thin.otf"),
    "Aileron-UltraLight": require("../assets/fonts/Aileron-UltraLight.otf"),
    "Aileron-Bold": require("../assets/fonts/Aileron-Bold.otf"),
    "Aileron-Heavy": require("../assets/fonts/Aileron-Heavy.otf"),
  });

  return fontsLoaded;
};
