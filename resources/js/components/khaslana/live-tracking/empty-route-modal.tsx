import { router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import React from 'react';

export default function EmptyRouteModal() {
    return (
        // z-[9999] biar nutupin Leaflet, absolute & inset-0 biar ukurannya nge-fit ke container map
        <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
            <div className="bg-[#1A1A1A] p-8 rounded-2xl flex flex-col items-center max-w-sm w-[90%] text-center border border-white/5 shadow-2xl">
                
                <div className="bg-[#2A2A2A] p-4 rounded-full mb-4">
                    <AlertCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-white text-xl font-bold mb-2">Waduh!</h3>
                <p className="text-gray-400 text-sm mb-8">
                    Anda Belum Memiliki Data Mangkal!
                </p>
                
                <button 
                    onClick={() => router.get('/stay-point')}
                    className="bg-[#99FF33] text-black font-bold py-2.5 px-10 rounded-full hover:bg-[#88e62d] transition-colors duration-200"
                >
                    Oke!
                </button>
            </div>
        </div>
    );
}