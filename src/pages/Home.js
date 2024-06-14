import React from 'react'
import gifBackground from '../background.gif';
import Header from '../Header'
import CodeForm from '../CodeForm'

function Home() {
    return (
        <div className='min-h-screen bg-slate-800 flex flex-col justify-center'>
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
