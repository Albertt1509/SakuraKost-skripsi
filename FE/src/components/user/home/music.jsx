import React, { useRef, useEffect } from 'react';
import Music from '../../../assets/music/music.mp3';

const Player = ({ isPlaying }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <div>
            <audio ref={audioRef} src={Music}></audio>
            <button className='opacity-0'>
                {isPlaying ? '.' : ','}
            </button>
        </div>
    );
};

export default Player;
