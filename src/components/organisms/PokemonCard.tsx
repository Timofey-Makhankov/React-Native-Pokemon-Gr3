import { useState } from "react";
import { Card, IconButton, Dialog, Paragraph, Portal, Button } from "react-native-paper";
import PokemonType from "../../Types/PokemonType";
import { FlatList, View, StyleSheet } from "react-native";
import ElementType from "../../Types/ElementType";
import TypeChip from "../atoms/TypeChip";
import AlphaColor from "../../Types/AlphaColor";
import { getContainerColorFromType } from "../../util/ColorFromType";
import CardDetail from "../molecules/CardDetail";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { EDIT_PAGE, POKEDEX_PAGE } from "../../util/ScreenRouterLinks";
import PokemonService from "../../services/PokemonService";


/**
 * Pokemon Card Component for displaing pokemon information
 * @param pokemonData {@link PokemonType} for a given pokemon
 * @returns Pokemon Card component
 */
export default function PokemonCard({
  pokemonData,
}: {
  pokemonData: PokemonType;
}) {
  const navigation = useNavigation<any>();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const toggleDeleteDialog = () => {
    setDeleteDialogVisible(!deleteDialogVisible);
  };

  /**
   * handles the delete of a pokemon
   * @param pokemon object to be deleted
   */
  const handleDelete = (pokemon: PokemonType) => {
    PokemonService().delete(pokemon.id!).then(() => {
      console.log("Pokemon deleted");
      toggleDeleteDialog();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: POKEDEX_PAGE }, 
          ],
        })
      );
    })
  }

  const bgColor: AlphaColor = getContainerColorFromType(pokemonData.type[0]);
  
  const _renderItem = ({ item }: { item: ElementType }) => (
    <TypeChip type={item} />
  );

  return (
    <View style={styles.view}>
      <Card
        mode="outlined"
        style={[
          styles.card,
          // The Color has to be set in the component
          {
            borderColor: `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, 0.8)`,
            backgroundColor: `rgba(${bgColor.red}, ${bgColor.green}, ${bgColor.blue}, 0.40)`,
          },
        ]}
      >
        <Card.Title
          titleVariant="headlineMedium"
          subtitleVariant="labelLarge"
          title={pokemonData.name.english}
          subtitle={`Pokédex: #${pokemonData.id}`}
        />
        <Card.Cover
          resizeMode="contain"
          source={{
            uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(
              "000" + pokemonData.id
            ).slice(-3)}.png`,
          }}
          alt={`A Pokemon with an english name: ${pokemonData.name.english}`}
        />
        <Card.Content>
          <FlatList
            horizontal
            data={pokemonData.type}
            renderItem={_renderItem}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            style={{ paddingVertical: 16 }}
          />
          <CardDetail info={pokemonData.base} />
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="delete"
            mode="outlined"
            onPress={toggleDeleteDialog}
            style={styles.icons}
          />
          <IconButton
            icon="pencil"
            mode="outlined"
            onPress={(_) => {
              navigation.navigate(EDIT_PAGE, {
                pokemonId: pokemonData.id,
                buttonText: "Update",
              });
            }}
            style={styles.icons}
          />
        </Card.Actions>
      </Card>
      
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={toggleDeleteDialog}>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this Pokémon?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleDeleteDialog}>Cancel</Button>
            <Button onPress={() => handleDelete(pokemonData)} labelStyle={{ color: 'red' }}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#fff",
    borderRadius: 15
  },
  card: {
    borderWidth: 4,
  },
  typeContainer: {
    marginTop: 8,
    width: "100%",
    flexDirection: "row",
  },
  icons: {
    borderWidth: 0,
  },
});
