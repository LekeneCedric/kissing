import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./myProfilStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import icons from "../../../../../constants/icons";
import iconSize from "../../../../../constants/iconSize";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../../../../../constants/colors";
import React from "react";
import Avatar from "../../../../../components/avatar/avatar";
import useMyProfileView from "./useMyProfileView";
import fontSizes from "../../../../../constants/font-sizes";
import SelectComponent from "../../../../../components/select/SelectComponent/selectComponent";
import { Controller } from "react-hook-form";
import InputArea from "../../../../../components/inputs/inputArea/inputArea";
import InterestsSelect from "../../../../../components/select/InterestsSelect/interestsSelect";
import Button from "../../../../../components/button/button";
import { BASEURL } from "../../../../../routes/ApiRoutes";
import useUploadImageProfile from "../../../../User/Profile/Complete/useUploadImageProfile";
const MyProfil = () => {
  const {
    user,
    goBack,
    form,
    searchTypeList,
    cameroonCitiesList,
    interests,
    interestLoading,
    navigateToGalerie,
    editMode,
    setEditMode,
    onSubmit,
    removeImage,
  } = useMyProfileView();
  const { images, uploadImages, removeImages, loading } =
    useUploadImageProfile();

  const {
    control,
    formState: { errors },
  } = form;
  return (
    <SafeAreaView style={[styles.container, { alignItems: "center" }]}>
      <View
        style={{
          width: "100%",
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={goBack}
          style={[styles.backIcon, { marginLeft: 0 }]}
        >
          <Icon size={wp("10%")} name={icons.back} color={colors.principal} />
        </TouchableOpacity>
        {editMode ? (
          <TouchableOpacity
            onPress={() => {
              const interest = control._fields.interests!._f.value;
              const city = control._fields.city!._f.value;
              const about = control._fields.about!._f.value;
              const search_type = control._fields.search_type!._f.value;

              onSubmit({
                city: city,
                interests: interest,
                about: about,
                search_type: search_type
              });
            }}
            style={styles.button}
          >
            <Icon
              name={icons.simpleCheck}
              size={iconSize.normal}
              color={colors.light}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setEditMode(!editMode);
            }}
          >
            <Icon
              name={icons.pencil}
              size={iconSize.medium}
              color={colors.dark}
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigateToGalerie(user.images![0]);
            }}
          >
            <Avatar
              size={"medium"}
              imageUri={BASEURL + "/" + user.images![0]?.image}
            />
          </TouchableOpacity>
        </View>

        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={styles.userName}>
            {" "}
            {user.username}, {user.age}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={styles.subTitle}>Galerie</Text>
          {editMode ? (
            <TouchableOpacity onPress={uploadImages} style={styles.button}>
              <Text style={{ color: colors.light, textAlign: "center" }}>
                Ajouter une photo
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigateToGalerie();
              }}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Icon
                name={icons.next}
                size={iconSize.medium}
                color={colors.principal}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flexDirection: "column", marginTop: hp("2%") }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              marginTop: hp("2%"),
              marginBottom: hp("2%"),
            }}
          >
            {user.images!.map((image, index) => {
              if (index !== 0) {
                return (
                  <TouchableOpacity
                    style={{ position: "relative" }}
                    onPress={() => {
                      navigateToGalerie(image);
                    }}
                  >
                    {editMode && (
                      <TouchableOpacity
                        onPress={() => {
                          removeImage(image.id);
                        }}
                        style={{
                          position: "absolute",
                          top: 15,
                          right: 15,
                          zIndex: 100000,
                          padding: 0,
                          borderRadius: 10,
                          backgroundColor: colors.red,
                        }}
                      >
                        <Icon
                          name={icons.delete}
                          size={iconSize.medium}
                          color={colors.light}
                        />
                      </TouchableOpacity>
                    )}
                    <Avatar imageUri={BASEURL + image.image} size={"small"} />
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </View>
        <View
          style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
        >
          <Text style={styles.sectionTitle}>Localisation</Text>
        </View>
        {editMode ? (
          <View style={{ width: "100%" }}>
            <Controller
              name={"city"}
              control={control}
              render={({ field }) => {
                return (
                  <SelectComponent
                    field={field}
                    errorMessage={errors.city?.message}
                    items={cameroonCitiesList}
                    description={"Je réside à"}
                    label={"Ville"}
                    notice={"Votre ville de résidence"}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View>
            <Text style={{ padding: 10, fontSize: fontSizes.sectionTitle }}>
              {user.city}
            </Text>
          </View>
        )}

        <View
          style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
        >
          <Text style={styles.sectionTitle}>A propos de moi</Text>
        </View>
        {editMode ? (
          <View style={{ width: "100%" }}>
            <Controller
              name={"about"}
              control={control}
              render={({ field }) => {
                return (
                  <InputArea
                    label={"A propos de moi"}
                    placeholder={"Ecrivez ici...."}
                    field={field}
                    errorMessage={errors.about?.message}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View>
            <Text
              style={{
                paddingTop: 10,
                paddingLeft: 10,
                paddingBottom: 10,
                fontSize: fontSizes.sectionTitle,
              }}
            >
              {user.about}
            </Text>
          </View>
        )}
        <View
          style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
        >
          <Text style={styles.sectionTitle}>Ce qui m'amène ici</Text>
        </View>
        {editMode ? (
          <View style={{ width: "100%" }}>
            <Controller
              name={"search_type"}
              control={control}
              render={({ field }) => {
                return (
                  <SelectComponent
                    field={field}
                    items={searchTypeList}
                    label={"Ce que je recherche"}
                    description={"Je suis ici pour"}
                    errorMessage={errors.search_type?.message}
                    notice={"Ce que vous recherchez"}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View>
            <Text style={{ padding: 10, fontSize: fontSizes.sectionTitle }}>
              {user.search_type}
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={styles.sectionTitle}>Mes intérêts</Text>
        </View>

        <View style={{ width: "100%" }}>
          <Controller
            name={"interests"}
            control={control}
            render={({ field }) => {
              return (
                <InterestsSelect
                  loading={interestLoading}
                  data={interests}
                  field={field}
                  errorMessage={errors.interests?.message}
                  notice={"Vos différents centres d'intérêts"}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfil;
