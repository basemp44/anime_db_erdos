import './Path.css';
import {useEffect, useRef } from "react";
import { PathItem } from '../PathItem/PathItem';

interface IPath {
	path: Array<any>
}

function Path({path}: IPath) {
	const pathEndRef = useRef<HTMLInputElement | null>(null);
	const scrollToBottom = () => {
    pathEndRef.current && pathEndRef.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  };
  useEffect(scrollToBottom, [path]);

	return (
		<div className='path'>
			<div className='scroll-path'>
				{
					path.map((item: any, index: number) => (
						<PathItem
							itemType={item.itemType}
							id={item.id}
							index={index}
							imgUrl={item.imgUrl}
							imgAlt={item.imgAlt}
							name={item.name}
						/>
					))
				}
				<span ref={pathEndRef} />
			</div>
		</div>
	);
}


export type { IPath };
export { Path };