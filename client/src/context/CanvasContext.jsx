import { createContext } from 'react';

export const canvas = createContext({
    width: window.innerWidth / 2 - 80,
    height: window.innerHeight - 80
});