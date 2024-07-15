import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

export const SportContext = createContext();

export const SportProvider = ({ children }) => {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      const res = await axios.get('http://localhost:5000/api/sports');
      setSports(res.data);
    };
    fetchSports();

    socket.on('update', (data) => {
      if (data.type === 'addSport') {
        setSports((prevSports) => [data.data, ...prevSports]);
      } else if (data.type === 'updateScore') {
        setSports((prevSports) => prevSports.map((sport) => (sport._id === data.data._id ? data.data : sport)));
      } else if (data.type === 'deleteSport') {
        setSports((prevSports) => prevSports.filter((sport) => sport._id !== data.data));
      }
    });

    return () => {
      socket.off('update');
    };
  }, []);

  return (
    <SportContext.Provider value={{ sports, selectedSport, setSelectedSport }}>
      {children}
    </SportContext.Provider>
  );
};
