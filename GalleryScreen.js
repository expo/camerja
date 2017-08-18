import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { FileSystem } from 'expo';

export default class GalleryScreen extends React.Component {
  state = {
    photos: [],
  };

  componentDidMount() {
    FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).then(photos => {
      this.setState({
        photos,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={this.props.onPress}>
          <Text>Back</Text>
        </TouchableOpacity>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            {this.state.photos.map(photoUri =>
              <Image
                style={styles.picture}
                source={{
                  uri: `${FileSystem.documentDirectory}photos/${photoUri}`,
                }}
                key={photoUri}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  picture: {
    width: 100,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
  },
  backButton: {
    padding: 20,
    marginBottom: 4,
    backgroundColor: 'indianred',
  },
});
