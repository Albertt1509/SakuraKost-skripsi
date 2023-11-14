import React, { useState, useRef, useEffect } from 'react';
import Music from '../../../assets/music/music.mp3';

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const playPauseHandler = () => {
        setIsPlaying(!isPlaying);
    };


    return (
        <div>
            <audio
                ref={audioRef}
                src={Music}
            ></audio>
            {/* Tambahkan tombol play/pause dan informasi pemutaran lainnya */}
            <button onClick={playPauseHandler}>{isPlaying ? 'Pause' : 'Play'}</button>

        </div>
    );
};

export default Player;
