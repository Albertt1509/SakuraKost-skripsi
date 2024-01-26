import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import SuksesAnimation from '../../../assets/animation/sukses.json';
import WaktuAnimation from '../../../assets/animation/waiting.json'
import BatalAnimation from '../../../assets/animation/batal.json'

export const Sukses = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: SuksesAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div ref={animationContainer} style={{ width: '60%', height: '50%' }}></div>
    );
}

export const Waktu = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: WaktuAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div ref={animationContainer} style={{ width: '60%', height: '50%' }}></div>
    );
}
export const BatalAnima = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: BatalAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div ref={animationContainer} style={{ width: '60%', height: '50%' }}></div>
    );
}
