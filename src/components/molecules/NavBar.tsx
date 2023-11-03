import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import PokedexPage from '../pages/PokedexPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';

const HomeRoute = () => <HomePage />;

const PokédexRoute = () => <PokedexPage />;

const ProfileRoute = () => <ProfilePage/>;


const NavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home'},
    { key: 'pokédex', title: 'Pokédex', focusedIcon: 'book' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    pokédex: PokédexRoute,
    profile: ProfileRoute
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      sceneAnimationEnabled
    />
  );
};

export default NavBar;