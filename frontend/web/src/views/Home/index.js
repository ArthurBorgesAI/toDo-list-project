import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import * as S from './styles'

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';

function Home() {
  const [filterActived, setFilterActived] = useState('Today');
  const [tasks, setTasks] = useState([]);
  const [lateCount, setLateCount] = useState();

  async function loadTasks(){
    await api.get(`/task/filter/${filterActived}/11:11:11:11:11:11`)
    .then(response => {
      setTasks(response.data);
    })
  }

  async function lateVerify(){
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
    .then(response => {
      setLateCount(response.data.length);
    })
  }

  function Notification(){
    setFilterActived('late');
  }


  useEffect( () => {
    loadTasks();
    lateVerify();
  },[filterActived])

  return (
  <S.Container>

    <Header lateCount={lateCount} clickNotification={Notification} />


    <S.FilterArea>
      <button type='button' onClick={() => setFilterActived("all") }>
        <FilterCard title="All" actived={filterActived === 'all'} />
      </button>
      <button type='button' onClick={() => setFilterActived("Today") }>
        <FilterCard title="Today" actived={filterActived === 'Today'}  />
      </button>
      <button type='button' onClick={() => setFilterActived("Week") }>
        <FilterCard title="Week" actived={filterActived === 'Week'}  />
      </button>
      <button type='button' onClick={() => setFilterActived("Month") }>
        <FilterCard title="Month" actived={filterActived === 'Month'}  />
      </button>
      <button type='button' onClick={() => setFilterActived("Year") }>
        <FilterCard title="Year" actived={filterActived === 'Year'}  />
      </button>
    </S.FilterArea>


    <S.Title>
      <h3>{filterActived === 'late' ? 'LATE TASKS' : 'TASKS'}</h3> 
    </S.Title>

    <S.Content>
      {
        tasks.map(t => (
          <Link to={`/task/${t._id}`}>
            <TaskCard type={t.type} title={t.title} when={t.when} done={t.done}/>
          </Link>
        ))
      }
    </S.Content>


    <Footer/>

  </S.Container>
  );
}

export default Home;
