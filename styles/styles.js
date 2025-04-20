// styles.js
import { StyleSheet } from "react-native";
import Colors from "./colors";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    shadowColor: "white",
    borderRadius: 5,
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 0,
  },
  title: {
    fontSize: 35,
    color: "black",
    marginBottom: 0,
    fontFamily: "Aileron-Light",
    marginTop: "15%",
  },
  homeMainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    paddingTop: 10,
    borderRadius: 15,
  },
  buttonContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 22,
  },
  buttonText: {
    fontFamily: "NexaDemo-Bold",
    color: "white",
    fontSize: 14,
  },
  separator: {
    width: "100%",
    height: 5,
    backgroundColor: "black",
    marginBottom: 0,
    overflow: "hidden",
    position: "relative",
  },
  silverDot: {
    width: 25,
    height: 45,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
  },
  staticBottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 90,
    backgroundColor: Colors.Primary,
    borderRadius: 0,
  },
  staticBottomLineContainer: {
    width: "100%",
    height: 4,
  },
  staticBottomLine: {},
  iconContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 25,
    marginTop: 20,
  },
  //Sign in
  signInContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  signInInputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  signInInput: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  //profile view
  topHeader: {
    flex: 1,
  },
  profile_main_view: {
    marginTop: 20,
    width: "96%",
    height: 160,
    alignSelf: "center",
    borderColor: Colors.Highlight,
    backgroundColor: Colors.Primary,
    borderWidth: 1,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.Highlight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  profile_image_section: {
    flexDirection: "column",
    marginLeft: 20,
    marginTop: -25,
    alignItems: "center",
    justifyContent: "center",
  },
  profile_image_view: {
    width: 80,
    height: 80,
  },
  profile_image_style: {
    borderRadius: 25,
  },
  profile_username_text: {
    lineHeight: 16,
    fontSize: 16,
    color: Colors.Secondary,
    fontFamily: "Aileron-Light",
    textAlign: "center",
    position: "absolute",
    top: 90,
  },
  pfp_image_line_sep: {
    marginLeft: 25,
  },
  profile_view_stats: {
    marginLeft: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  full_name_text: {
    fontSize: 18,
    color: Colors.Secondary,
    fontFamily: "Aileron-Heavy",
    marginBottom: 10,
  },
  pfp_name_rating_line: {
    alignSelf: "center",
  },
  ratings_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratings_text: {
    fontSize: 16,
    color: Colors.Secondary,
    fontFamily: "Aileron-Light",
    marginTop: 0,
  },
  star_image: {
    width: 20,
    height: 15,
    marginLeft: 0,
    marginRight: 0,
  },
  //Find Search Page
  column_page_header: {
    flex: 1,
    flexDirection: "column",
  },

  bis_tab_nav: {
    paddingTop: 15,
    color: "red",
    width: "80%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  bis_tab_nav_item: {
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  bis_tab_nav_item_selected: {
    borderBottomColor: "black",
    alignSelf: "center",
  },
  input_container: {
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input_label: {
    marginBottom: 5,
    fontSize: 20,
    fontFamily: "Aileron-Bold",
    color: Colors.Highlight,
  },
  generic_input_container: {
    height: 60,
    borderColor: Colors.Highlight,
    borderWidth: 2,
    borderRadius: 25,
    width: "80%",
    textAlign: "center",
    shadowColor: Colors.Highlight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    backgroundColor: "#c2c2c2",
  },
  post_button_container: {
    marginTop: 10,
    alignItems: "center",
    width: 80,
    height: 40,
    alignSelf: "center",
  },
  default_button_text: {
    fontSize: 15,
    fontFamily: "Aileron-Heavy",
    color: Colors.Secondary,
  },

  //post_page
  post_form_item_spacing: {
    marginBottom: 20,
  },
  post_bis_form_container: {
    flexGrow: 1,
    marginTop: 20,
    alignItems: "center",
    width: "97%",
    borderRadius: 25,
    backgroundColor: Colors.Primary,
    alignSelf: "center",
    gap: 25,
    paddingBottom: 130,
  },
  inputContainer: {
    width: "90%",
    height: 50,
  },
  inputStyle: {
    width: "100%",
    height: 50,
    textAlign: "center",
  },
  submit_btn_container: {
    alignItems: "center",
    width: "50%",
    height: 50,
    alignSelf: "center",
  },
  //view bis page
  post_bis_text_container: {
    marginTop: 10,
    alignItems: "center",
    width: 100,
    height: 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  main_background: {
    backgroundColor: "#e2e2e2",
    flex: 1,
  },
});
