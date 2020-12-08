import React, {useEffect, useState} from 'react';
import {Link, useParams } from 'react-router-dom';
import {ICharacter, ILocation} from '../../types/interfaces';
import api from '../../services/api';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import CharactersListing from '../../components/CharactersListing/CharactersListing';
import config from '../../configuration/config';

export default function Location() {
  const { id } = useParams<{id: string;}>();
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  useEffect(() => {
    api.retrieveLocation(Number(id)).then(location => {
      setLocation(location);
    }).catch();
  }, [id]);

  useEffect(() => {
    if (location) {
      api.retrieveCharactersByIds(getLocationResidentsIds()).then(characters => {
        setCharacters(characters || []);
      }).catch();
    }
  }, [location]);

  const getLocationSubtitle = () => {
    return (
      <div className="p-grid">
        <div className="p-sm-4 p-d-flex p-flex-row p-align-center">
          <span>Dimension</span>
          <strong className="p-d-block p-ml-3">{location?.dimension}</strong>
        </div>
        <div className="p-sm-4 p-d-flex p-flex-row p-align-center">
          <span>Type</span>
          <strong className="p-d-block p-ml-3">{location?.type}</strong>
        </div>
        <div className="p-sm-4 p-d-flex p-flex-row p-align-center">
          <span>Total Residents</span>
          <strong className="p-d-block p-ml-3">{location?.residents.length}</strong>
        </div>
      </div>
    )
  };

  const getLocationResidentsIds = () => {
    const residentIds = location?.residents.map(residentUrl => Number(residentUrl.replace(`${config.api.url}${config.api.paths.characters}/`, '')));
    return residentIds || [];
  }

  let content;

  if (!location) {
    content = (
      <Card className="p-text-center" style={{ width: '100%' }}>
        <ProgressSpinner style={{width: '50px', height: '50px'}} fill="#FFFFFF" />
      </Card>
    );
  } else {
    content = (
      <div className="wrapper">
        <Card title={location.name} subTitle={getLocationSubtitle()}>
          <Link to="/">
            <Button label="Return home" icon="pi pi-arrow-left" className="p-button-secondary p-button-outlined" />
          </Link>
        </Card>
        <div className="p-mt-5">
          <h1 style={{ color: '#FFFFFF' }}>Residents</h1>
          <CharactersListing characters={characters} />
        </div>
      </div>
    );
  }

  return (
    <div className="container p-d-flex p-flex-column">
      {content}
    </div>
  )
}
