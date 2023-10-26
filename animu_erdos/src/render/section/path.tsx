import { IAnime } from '../../interfaces/IAnime';
import { ICharacter } from '../../interfaces/ICharacter';
import { IGame } from '../../interfaces/IGame';
import { IStaff } from '../../interfaces/IStaff';
import { IVoiceactor } from '../../interfaces/IVoiceactor';
import { renderAnimePath } from './atomic/anime';
import { renderCharacterPath } from './atomic/character';
import { renderStaffPath } from './atomic/staff';
import { renderVoiceactorPath } from './atomic/voiceactor';


function renderPath(game: IGame) {
	return (
		<div className='path'>
			{game.path.map((it, index) => {
				if (it.hasOwnProperty('anime_id'))
					return renderAnimePath(it as IAnime, index);
				else if (it.hasOwnProperty('character_id'))
					return renderCharacterPath(it as ICharacter, index);
				else if (it.hasOwnProperty('staff_id'))
					return renderStaffPath(it as IStaff, index);
				else if (it.hasOwnProperty('voiceactor_id'))
					return renderVoiceactorPath(it as IVoiceactor, index);
			})}
		</div>
	);
}


export default renderPath;