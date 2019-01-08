import React from 'react';
import MenuData from './menuData';

export default function Menu({ onItemSelected }) {
  return (
    <MenuData onItemSelected={onItemSelected} />
  );
}
