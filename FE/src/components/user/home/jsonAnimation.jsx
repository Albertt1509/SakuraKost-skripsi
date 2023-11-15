import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import locationAnimation from '../../../assets/animation/location.json'; // Ganti dengan path yang sesuai
import paymentAnimation from '../../../assets/animation/payment.json'; // Ganti dengan path yang sesuai
import bookingAnimation from '../../../assets/animation/booking.json'; // Ganti dengan path yang sesuai

export const Location = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: locationAnimation,
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
};

export const Payment = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: paymentAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div ref={animationContainer} style={{ width: '40%', height: '20%' }}></div>
    );
}

export const Booking = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: bookingAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div ref={animationContainer} style={{ width: '80%', height: '50%' }}></div>
    );
};
