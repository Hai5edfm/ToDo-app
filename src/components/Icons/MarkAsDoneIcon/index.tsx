import { FC } from 'react';
import { IconTypes } from '@src/customTypes/icons';

export const MarkAsDoneIcon: FC<IconTypes> = ({
		width = 261,
		height = 261,
		fill = "black"
	}: IconTypes) => (
	<svg width={width} height={height} viewBox="0 0 261 261" fill="none">
		<path d="M232.453 48.4277H214.637C212.139 48.4277 209.769 49.5747 208.239 51.5373L103.151 184.663L52.7607 120.814C51.9985 119.847 51.0268 119.064 49.9188 118.526C48.8108 117.987 47.5952 117.706 46.3632 117.705H28.5469C26.8392 117.705 25.8961 119.667 26.9411 120.993L96.7535 209.437C100.016 213.566 106.286 213.566 109.574 209.437L234.059 51.6902C235.104 50.3903 234.161 48.4277 232.453 48.4277V48.4277Z" fill={fill}/>
	</svg>
)



