import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {ICharacter, IEpisode} from '../../types/interfaces';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {useSelector} from 'react-redux';
import {selectAllEpisodes} from '../../redux/slices/episodeSlice';
import config from '../../configuration/config';

interface IProps {
  character: ICharacter;
}

function CharacterEpisodesDialog(props: IProps, ref: any) {
  const [isVisible, setVisible] = useState(false);
  const [characterEpisodes, setCharacterEpisodes] = useState<IEpisode[]>([]);
  const episodes = useSelector(selectAllEpisodes);

  useEffect(() => {
    const episodeIds = props.character.episode.map(episodeUrl => Number(episodeUrl.replace(`${config.api.url}${config.api.paths.episodes}/`, '')));
    setCharacterEpisodes(episodes.filter(episode => episodeIds.indexOf(episode.id) > -1));
  }, [episodes]);

  useImperativeHandle(
    ref,
    () => ({
      show() {
        setVisible(true);
      }
    })
  );

  const hideDialog = () => {
    setVisible(false);
  };

  return (
    <Dialog
      header={`View all episodes of ${props.character.name}`}
      visible={isVisible}
      style={{ width: '95vw', maxWidth: '800px' }}
      className=""
      onHide={() => hideDialog()}
    >
      <DataTable value={characterEpisodes} className="p-datatable-gridlines">
        <Column field="name" header="Name" />
        <Column field="air_date" header="Air Date" />
        <Column field="episode" header="Episode" />
      </DataTable>
    </Dialog>
  );
}

export default forwardRef(CharacterEpisodesDialog);
