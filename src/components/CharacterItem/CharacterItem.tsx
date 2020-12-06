import React, {useRef} from 'react';
import {Card} from 'primereact/card';
import {ICharacter} from '../../types/interfaces';
import './CharacterItem.css';
import {Button} from 'primereact/button';
import CharacterEpisodesDialog from '../CharacterEpisodesDialog/CharacterEpisodesDialog';

export default function CharacterItem(props: { character: ICharacter }) {
  const { character } = props;

  const informationItems = [
    { label: 'Status', key: 'status' },
    { label: 'Species', key: 'species' },
    { label: 'Gender', key: 'gender' },
    { label: 'Type', key: 'type' }
  ]

  const episodesDialogRef = useRef<any>();

  const onViewEpisodesClick = () => {
    episodesDialogRef.current.show();
  }

  return (
    <Card title={character.name} className="character">
      <section className="profile-picture p-text-center">
        <img src={character.image} alt={character.name} />
      </section>

      <section className="information p-mt-5">
        {informationItems.map(informationItem => {
          return (
            <div key={informationItem.key} className="information-item p-pt-1 p-pb-1 p-mb-1">
              <div className="p-grid">
                <div className="p-col-4">
                  <strong>{informationItem.label}</strong>
                </div>
                <div className="p-col-8">
                  <span>{character[informationItem.key as keyof ICharacter]}</span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="information-item p-pt-1 p-pb-1 p-mb-1">
          <div className="p-grid">
            <div className="p-col-4">
              <strong>Origin</strong>
            </div>
            <div className="p-col-8">
              <a href={character.origin.url} target="_blank">{character.origin.name}</a>
            </div>
          </div>
        </div>

        <div className="information-item p-pt-1 p-pb-1 p-mb-1">
          <div className="p-grid">
            <div className="p-col-4">
              <strong>Location</strong>
            </div>
            <div className="p-col-8">
              <a href={character.location.url} target="_blank">{character.location.name}</a>
            </div>
          </div>
        </div>
      </section>

      <div className="p-mt-auto">
        <section className="button-bar p-mt-3">
          <div className="p-grid">
            <div className="p-col-4 p-text-center">
              <Button icon="pi pi-globe" className="p-button-rounded p-button-outlined" tooltip="View location's residents" tooltipOptions={{position: 'top'}} />
            </div>
            <div className="p-col-4 p-text-center">
              <Button icon="pi pi-home" className="p-button-rounded p-button-outlined" tooltip="View origin's residents" tooltipOptions={{position: 'top'}} />
            </div>
            <div className="p-col-4 p-text-center">
              <Button icon="pi pi-external-link" className="p-button-rounded p-button-outlined" tooltip="External Link" tooltipOptions={{position: 'top'}} onClick={() => window.open(`https://rickandmorty.fandom.com/wiki/${character.name.replace(' ', '_')}`, '_blank')} />
            </div>
          </div>
        </section>

        <footer className="p-mt-3">
          <div className="p-grid">
            <div className="p-col-12">
              <Button label="View Episodes" className="p-button-raised p-button-lg p-text-uppercase p-text-bold" style={{ width: '100%' }} onClick={onViewEpisodesClick} />
            </div>
          </div>
        </footer>
      </div>

      <CharacterEpisodesDialog ref={episodesDialogRef} character={character} />
    </Card>
  )
}
