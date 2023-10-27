import {useEffect, useRef } from "react";
import { IAnime } from '../../interfaces/IAnime';
import { ICharacter } from '../../interfaces/ICharacter';
import { IGame } from '../../interfaces/IGame';
import { IStaff } from '../../interfaces/IStaff';
import { IVoiceactor } from '../../interfaces/IVoiceactor';
import { AnimePath } from './atomic/Anime';
import { CharacterPath } from './atomic/Character';
import { StaffPath } from './atomic/Staff';
import { VoiceactorPath } from './atomic/Voiceactor';


function Path({game}: {
	game: IGame
}) {
	const pathEndRef = useRef<HTMLInputElement | null>(null);
	const scrollToBottom = () => {
    pathEndRef.current && pathEndRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [game.path]);

	return (
		<div className='path'>
			<div className='scroll-path'>
				{
					game.path.map((it, index) => {
						if (it.hasOwnProperty('anime_id'))
							return (
								<AnimePath anime={it as IAnime} index={index}/>
							)
						else if (it.hasOwnProperty('character_id'))
							return (
								<CharacterPath character={it as ICharacter} index={index}/>
							)
						else if (it.hasOwnProperty('staff_id'))
							return (
								<StaffPath staff={it as IStaff} index={index}/>
							)
						else if (it.hasOwnProperty('voiceactor_id'))
							return (
								<VoiceactorPath voiceactor={it as IVoiceactor} index={index}/>
							)
					})
				}
				<span ref={pathEndRef} />
			</div>
		</div>
	);
}


export {
	Path
};