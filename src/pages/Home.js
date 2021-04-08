import React, {Fragment, useContext, useEffect} from 'react';
import { Alert } from '../components/Alert';
import { Countnotes } from '../components/Countnotes';
import {Form} from '../components/Form';
import { Loader } from '../components/Loader';
import {Notes} from '../components/Notes';
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Home = () => {

  const {loading, notes, fetchNotes, removeNote, countnotes} = useContext(FirebaseContext)
  
  const {show} = useContext(AlertContext)
  

  useEffect(() => {
    fetchNotes()
  }, []) 

  return (
    <Fragment>

      <Alert />

      <Form />

      <hr/>

      {loading
        ? <Loader />
        : <Notes notes={notes} onRemove={removeNote} show={show} />
      }

      <Countnotes countnotes={countnotes} />

    </Fragment>
  )
}











