import React from 'react';
import styles from './main.module.css';
import NavBar from './navbar';
import Drawer from './drawer/drawer.view';
import Accordion from '../../components/accordion';

const Main = () => {
  const collection1 = {
    name: 'School',
    icon: 'School',
  };
  const tasks1 = [
    { description: 'exam biology', done: false, date: '2021-03-20' },
    { description: 'math project', done: true, date: '2021-03-15' },
  ];
  const collection2 = {
    name: 'My',
    icon: 'Personal',
  };
  const tasks2 = [
    { description: 'Peluquería mechas', done: true, date: '2021-03-26' },
    { description: 'Mi cunpleaños', done: false, date: '2021-03-31' },
    { description: 'Comida con Xurrymindungui', done: false, date: '2021-03-31' },
    { description: 'Comprar bambas nuevas', done: true, date: '2021-03-31' },
    { description: 'Encontrar tranajo yoro fuerte', done: false, date: '2021-03-31' },
  ];
  const collection3 = {
    name: 'Gym',
    icon: 'Sport',
  };
  const tasks3 = [
    { description: 'Partido Basket', done: false, date: '2021-03-20' },
    { description: 'Entreno con equipo calella', done: true, date: '2021-03-15' },
  ];
  return (
    <div className={styles.root}>
      <div>
        <NavBar />
        <Drawer />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <Accordion collection={collection1} tasks={tasks1} />
          <Accordion collection={collection2} tasks={tasks2} />
          <Accordion collection={collection3} tasks={tasks3} />
        </div>
      </div>
    </div>
  );
};

export default Main;
