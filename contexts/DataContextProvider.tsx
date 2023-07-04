import { createContext, ReactNode } from 'react';
import { IItem } from './IItem';
import dbRaw from '../config/database.json';

const db: IItem[] = dbRaw.data as IItem[];

export const DataContext = createContext(db);

export const DataContextProvider = function(props: { children: ReactNode }) {
  return (
    <DataContext.Provider value={db}>
      {props.children}
    </DataContext.Provider>
  );
}
