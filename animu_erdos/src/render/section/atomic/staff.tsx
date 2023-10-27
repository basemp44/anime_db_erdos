
import React from 'react';
import { IAnimeDb } from '../../../interfaces/IAnimeDb';
import { IStaff } from '../../../interfaces/IStaff';
import { updatePickStaff } from '../../../logic/game';
import { EGameStatus } from '../../../enums/EGameStatus';


function renderStaff(
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
	staff: IStaff,
	keyType?: string,
	index?: number,
	divClassName?: string,
	imgClassName?: string,
) {
	return (
		<div
			key={`staff-${keyType}-${staff.staff_id}-${index}`}
			className={`${divClassName} ${onClick ? 'pointer' : ''}`}
			onClick={onClick}>
			<div className='img-container'>
				<img
					className={imgClassName}
					src={staff.image_url}
					alt={staff.name}
				/>
			</div>
			<p className='name'>{staff.name}</p>
		</div>
	);
}


function renderStaffPickable(
	animedb: IAnimeDb,
	setGame: Function,
	status: EGameStatus,
	staff: IStaff,
	...rest: any[]
) {
	return renderStaff(
		status == EGameStatus.playing
			? () => setGame(updatePickStaff(animedb, staff.staff_id))
			: undefined,
		staff,
		...rest
	);
}


function renderStaffUnpickable(
	staff: IStaff,
	...rest: any[]
) {
	return renderStaff(
		undefined,
		staff,
		...rest
	);
}


function StaffChoice({animedb, setGame, staff, status}: {
	animedb: IAnimeDb,
	setGame: Function,
	staff: IStaff,
	status: EGameStatus
}) {
	return renderStaffPickable(
		animedb,
		setGame,
		status, // EGameStatus
		staff,
		'choices', //keyType
		0, // index
		'card staff', // divClassName
		'' // imgClassName
	);
}


function StaffPath({staff, index} : {
	staff: IStaff,
	index: number
}) {
	return renderStaffUnpickable(
		staff,
		'path', //keyType
		index,
		'list-item staff disabled', // divClassName
		'' // imgClassName
	);
}


export {
	StaffChoice,
	StaffPath
};