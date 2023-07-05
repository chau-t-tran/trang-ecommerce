import { createContext, ReactNode } from 'react';
import { IItem } from './IItem';
import dbRaw from '../config/database.json';
import Hash from '../utility/hash';

const db: IItem[] = (dbRaw.data as IItem[]).map(x => {
  x.id = Hash(x.name + x.image);
  return x;
});

export const DataContext = createContext(db);

export const DataContextProvider = function(props: { children: ReactNode }) {
  return (
    <DataContext.Provider value={db}>
      {props.children}
    </DataContext.Provider>
  );
}
