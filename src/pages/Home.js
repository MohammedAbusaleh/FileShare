import React from 'react'
import gifBackground from '../assets/background.gif';
import Header from '../components/Header'
import CodeForm from '../components/CodeForm'

function Home() {
    return (
        <div className='min-h-screen bg-slate-800 flex flex-col justify-start'>
            <Header />
            <div className="flex-1 flex justify-center items-center"
            style={{
                backgroundImage: `url(${gifBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animation: 'moveBackground 10s infinite linear'
            }}
            >
            <CodeForm />
            </div>
        </div>
        );
}

export default Home
