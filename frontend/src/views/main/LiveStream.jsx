import React, {useContext} from 'react';
import Chat from '../../components/main/Chat';
import VideoPlayer from '../../components/main/VideoPlayer';
import {UserContext} from '../../contexts/UserContext';
const LiveStream = () => {
    const {username, countryId} = useContext(UserContext);
    const playerRef = React.useRef(null);


    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'http://195.148.104.124:1935/jakelu/jakfilms/manifest.mpd',
            type: 'application/dash+xml'
        }],
        playbackRates: [0.5, 1, 1.5, 2],
        liveui: true,
    };




    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            // videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            // videojs.log('player will dispose');
        });
    };

    const generateUsername = () => {
        const adjectives = ['happy', 'sad', 'angry', 'excited', 'sleepy', 'hungry', 'thirsty', 'silly', 'goofy', 'crazy'];
        const nouns = ['cat', 'dog', 'bird', 'fish', 'hamster', 'turtle', 'lion', 'tiger', 'bear', 'elephant'];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${randomAdjective}-${randomNoun}`;
    };

    console.log(generateUsername()); // Example output: "happy-turtle"
    return (
        <section className="border rounded flex flex-col md:flex-row justify-center items-center md:items-start p-2 ">


            <VideoPlayer className="w-2/3 h-full " options={videoJsOptions} onReady={handlePlayerReady} />
            <Chat className=" " username={generateUsername()} countryid={'FI'} />
            {/* <Chat className=" " username={username} countryid={countryId} /> */}

        </section>
    );
};

export default LiveStream;