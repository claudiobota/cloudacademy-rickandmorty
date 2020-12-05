import React from 'react';
import {Card} from 'primereact/card';
import {ICharacter} from '../../types/interfaces';
import './CharacterItem.css';
import {Button} from 'primereact/button';

export default function CharacterItem(props: { character: ICharacter }) {
  const { character } = props;
  const informationItems = [
    { label: 'Status', key: 'status' },
    { label: 'Species', key: 'species' },
    { label: 'Gender', key: 'gender' },
    { label: 'Type', key: 'type' }
  ]

  return (
    <Card title={character.name} className="character">
      <div className="p-grid">
        <div className="p-col-12 p-text-center">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="p-col-12 p-mt-5">
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
          <div className="p-grid p-mt-5">
            <div className="p-col-4 p-text-center">
              <Button icon="pi pi-globe" className="p-button-rounded p-button-outlined" tooltip="View location's residents" tooltipOptions={{position: 'top'}} />
            </div>
            <div className="p-col-4 p-text-center">
              <Button icon="pi pi-home" className="p-button-rounded p-button-outlined" tooltip="View origin's residents" tooltipOptions={{position: 'top'}} />
            </div>
            <div className="p-col-4 p-text-center">
              <Button icon="pi pi-external-link" className="p-button-rounded p-button-outlined" tooltip="External Link" tooltipOptions={{position: 'top'}} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
