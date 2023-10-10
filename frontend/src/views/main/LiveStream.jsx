import React, {useContext, useEffect, useState} from 'react';
import Chat from '../../components/main/Chat';
import NoUser from '../../components/main/NoUser';
import VideoPlayer from '../../components/main/VideoPlayer';
import {UserContext} from '../../contexts/UserContext';
import {VideoFeedContext} from '../../contexts/VideoFeedContext';
const LiveStream = () => {
	const {user} = useContext(UserContext);
	const {isVideoFeedOnline} = useContext(VideoFeedContext);
	const playerRef = React.useRef(null);
	const [videoJsOptions, setVideoJsOptions] = useState({});
	// console.log(user, 'user');
	useEffect(() => {
		const options = {
			autoplay: true,
			controls: true,
			responsive: true,
			fluid: true,
			playbackRates: [0.5, 1, 1.5, 2],
			liveui: isVideoFeedOnline,
		};

		if (isVideoFeedOnline) {
			options.sources = [
				{
					src: 'http://195.148.104.124:1935/jakelu/jakfilms/manifest.mpd',
					type: 'application/dash+xml',
				},
			];
		} else {
			options.sources = [
				{
					src: './videos/hidden/tallenne.mp4',
					type: 'video/mp4',
				},
			];
		}

		setVideoJsOptions(options);
	}, [isVideoFeedOnline]);

	const handlePlayerReady = (player) => {
		playerRef.current = player;

		// You can handle player events here, for example:
		player.on('waiting', () => {
			// videojs.log('player is waiting');
		});

		player.on('dispose', () => {
			// videojs.log('player will dispose');
		});
		player.on('playing', () => {
			// videojs.log('player is playing');
		});
		player.on('pause', () => {
			// videojs.log('player is paused');
		});
		player.on('error', () => {
			// videojs.log('player is error');
		});
	};
	// only for testing
	// const generateUsername = () => {
	//   const adjectives = [
	//     'happy',
	//     'sad',
	//     'angry',
	//     'excited',
	//     'sleepy',
	//     'hungry',
	//     'thirsty',
	//     'silly',
	//     'goofy',
	//     'crazy',
	//   ];
	//   const nouns = [
	//     'cat',
	//     'dog',
	//     'bird',
	//     'fish',
	//     'hamster',
	//     'turtle',
	//     'lion',
	//     'tiger',
	//     'bear',
	//     'elephant',
	//   ];
	//   const randomAdjective =
	//     adjectives[Math.floor(Math.random() * adjectives.length)];
	//   const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
	//   return `${randomAdjective}-${randomNoun}`;
	// };
	// const countries = ['FI', 'DK', 'NO', 'SE', 'IS', 'EE'];
	// const randomCountry = countries[Math.floor(Math.random() * countries.length)];
	const now = new Date();
	const targetDate = new Date('11/10/2023 13:00:00');

	let message;
	if (now < targetDate) {
		message = 'The live stream has not started yet.';
	} else {
		message =
			'Sorry but you missed the live stream. You can watch it later from below.';
	}
	return (
		<>
			{!isVideoFeedOnline && (
				<h2 className='text-2xl font-bold text-center md:text-left'>
					{message}
				</h2>
			)}
			<section className='border rounded bg-gray-100 flex flex-col md:flex-row justify-around items-center md:items-start p-2 '>
				<VideoPlayer
					options={videoJsOptions}
					onReady={handlePlayerReady}
				/>
				{/* dev usage only */}
				{/* <Chat
        className=' '
        username={generateUsername()}
        countryid={randomCountry}
      /> */}
				{/* <Chat className=" " username={'anon'} countryid={'FI'} /> */}
				{/* real one next  */}
						<Chat
								className=''
								user={user}
						/>
			</section>
		</>
	);
};

export default LiveStream;
