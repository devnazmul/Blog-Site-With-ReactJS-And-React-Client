import React from 'react';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import Hero from './Components/Hero/Hero';
import Plants from './Components/Services/Plants';

const Home = () => {
    return (
        <div>
            <Header />
            <Hero />
            <Plants numberOfCards={8} />
            <Footer />
        </div>
    );
};

export default Home;