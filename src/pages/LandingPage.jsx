import React, { useEffect, useRef, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

//components
import Hero from '../components/Hero';
import About from '../components/About';
import Ventures from './../components/Ventures';
import Metrics from './../components/Metrics';
import Vision from '../components/Vision';
import Timeline from './../components/Timeline';
import Contact from './../components/Contact';
import Footer from './../components/Footer';
import Navbar from './../components/Navbar';



gsap.registerPlugin(ScrollTrigger);

export default function LandingPage(){


    useEffect(() => {
    // Instantiate high-end momentum smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        });

        function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync Lenis scroll positions into GSAP ScrollTrigger timeline execution
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
        lenis.destroy();
        gsap.ticker.remove(raf);
        };
    }, []);

    return (
        <>
        <Navbar />
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="ventures"><Ventures /></section>
        <section id="metrics"><Metrics /></section>
        <section id="vision"><Vision /></section>
        <section id="timeline"><Timeline /></section>
        <section id="contact"><Contact /></section>
        <section id="footer"><Footer /></section>
        </>
    );
}