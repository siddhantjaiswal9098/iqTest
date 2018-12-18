import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import * as Actions from './../../actions/commonAction'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const window = Dimensions.get('window');
import MenuData from './menuData.js'
const styles = StyleSheet.create({
  menu: {
    width: window.width,
    height: window.height,
    backgroundColor: '#61abea',
    padding: 20,
  },
});

export default function Menu({ onItemSelected }) {

  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <MenuData onItemSelected={onItemSelected} />
    </ScrollView>
  );
}