import AlphaColor from "../Types/AlphaColor";
import ChipColorsType from "../Types/ChipColorsType";
import ElementType from "../Types/ElementType";

export function getContainerColorFromType(type: ElementType): AlphaColor {
  switch (type) {
    case "Bug":
      return {red: 186, green: 220, blue: 51};

    case "Dark":
      return {red: 33, green: 35, blue: 41};

    case "Dragon":
      return {red: 32, green: 85, blue: 221};

    case "Electric":
      return {red: 255, green: 232, blue: 24};

    case "Fairy":
      return {red: 245, green: 123, blue: 233};

    case "Fighting":
      return {red: 182, green: 17, blue: 17};

    case "Flying":
      return {red: 162, green: 185, blue: 244};

    case "Fire":
      return {red: 234, green: 137, blue: 22};

    case "Ghost":
      return {red: 99, green: 17, blue: 182};

    case "Grass":
      return {red: 79, green: 157, blue: 87};

    case "Ground":
      return {red: 208, green: 82, blue: 11};

    case "Ice":
      return {red: 71, green: 212, blue: 232};

    case "Normal":
      return {red: 168, green: 174, blue: 190};

    case "Poison":
      return {red: 127, green: 48, blue: 147};

    case "Psychic":
      return {red: 216, green: 19, blue: 196};

    case "Rock":
      return {red: 121, green: 100, blue: 75};

    case "Steel":
      return {red: 64, green: 115, blue: 122};

    case "Water":
      return {red: 0, green: 70, blue: 249};
  }
}

export function getTextColorFromType(type: ElementType): AlphaColor {
    switch (type) {
      case "Bug":
        return {red: 68, green: 46, blue: 25};
  
      case "Dark":
        return {red: 0, green: 0, blue: 0};
  
      case "Dragon":
        return {red: 5, green: 22, blue: 47};
  
      case "Electric":
      case "Fire":
      case "Ice":
      case "Normal":
      case "Rock":
        return {red: 68, green: 46, blue: 25};
  
      case "Fairy":
        return {red: 82, green: 1, blue: 74};
  
      case "Fighting":
        return {red: 44, green: 13, blue: 13};
  
      case "Flying":
        return {red: 46, green: 47, blue: 84};
  
      case "Ghost":
        return {red: 26, green: 13, blue: 44};
  
      case "Grass":
        return {red: 0, green: 57, blue: 6};
  
      case "Ground":
        return {red: 83, green: 46, blue: 12};
  
      case "Poison":
        return {red: 30, green: 0, blue: 76};
  
      case "Psychic":
        return {red: 57, green: 10, blue: 46};
  
      case "Steel":
        return {red: 44, green: 58, blue: 70};
  
      case "Water":
        return {red: 14, green: 0, blue: 69};
    }
  }

export function getChipColorFromType(type: ElementType): ChipColorsType {
    return {text: getTextColorFromType(type), container: getContainerColorFromType(type)}
  }