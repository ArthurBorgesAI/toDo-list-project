import React, { useState, useEffect } from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {format} from 'date-fns';
import * as S from './styles'

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeIcons';

function Task() {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [lateCount, setLateCount] = useState();
  const [type, setType] = useState();
  const [ID, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macAddress, setMacAddress] = useState('11:11:11:11:11:11');


  async function lateVerify(){
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
    .then(response => {
      setLateCount(response.data.length);
    })
  }


  async function loadTasksDetails(){
    await api.get(`/task/${id}`)
        .then(response => {
            setType(response.data.type);
            setDone(response.data.done);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setDate(format(new Date(response.data.when),'yyyy-MM-dd' ));
            setHour(format(new Date(response.data.when), 'HH:mm'));
        })
    }


  async function Save(){
    if(!title) return alert("Title missing!");
    if(!description) return alert("Description missing!");
    if(!type) return alert("Type missing!");
    if(!date) return alert("Date missing!");
    if(!hour) return alert("Hour missing!");

    if(id){
        await api.put(`/task/${id}`, {
            macAddress,
            done,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`
        }).then(() => setRedirect(true) )

    }else{
        await api.post('/task', {
            macAddress,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`
        }).then(() =>  setRedirect(true) )
    }
  }


  async function Remove(){
    const res = window.confirm("Confirm exclusion");
    if (res === true) await api.delete(`/task/${id}`)
            .then( () => setRedirect(true))
  }


  useEffect( () => {
    lateVerify();
    loadTasksDetails();
  },[])

  return (
  <S.Container>
    {redirect && <Navigate to="/" />}
    <Header lateCount={lateCount}/>

    <S.Form>
        <S.TypeIcons>
            {
                
                TypeIcons.map( (icon, index) => (
                    index > 0 &&
                    <button type='button' onClick={() => setType(index)}>
                        <img src={icon} alt="Task type" 
                        className={type && type !== index && 'inative'} />
                    </button>
                ))
            }
        </S.TypeIcons>


        <S.Input>
            <span>Title</span>
            <input type="text" placeholder="task title " 
            onChange={e => setTitle(e.target.value)} value={title} />
        </S.Input>

        <S.TextArea>
            <span>Description</span>
            <textarea rows={5} placeholder="task details"
            onChange={e => setDescription(e.target.value)} value={description} />
        </S.TextArea>

        <S.Input>
            <span>Date</span>
            <input type="date" placeholder="task date "
            onChange={e => setDate(e.target.value)} value={date} />
        </S.Input>

        <S.Input>
            <span>Time</span>
            <input type="time" placeholder="task time "
            onChange={e => setHour(e.target.value)} value={hour} />
        </S.Input>

        <S.Options>
            <div>
                <input type="checkbox" checked={done} onChange={() => setDone(!done)}/>
                <span>DONE</span>
            </div>

            {id && <button type='button' onClick={Remove}>DELETE</button> }
        </S.Options>

        <S.Save>
            <button type='button' onClick={Save}>SAVE</button>
        </S.Save>

    </S.Form>


    <Footer/>

  </S.Container>
  );
}

export default Task;
