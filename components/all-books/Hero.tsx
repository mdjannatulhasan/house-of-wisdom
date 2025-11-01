'use client';

import { FormEvent, useState } from 'react';
import BtnPrimary from '../common/BtnPrimary';
import { useRouter } from 'next/navigation';

interface HeroProps {
  filters?: {
    searchTerm?: string;
    genre?: string;
    year?: string;
  };
}

const Hero = ({ filters = {} }: HeroProps) => {
    const router = useRouter();
    const [data, setData] = useState({
        searchTerm: filters.searchTerm || '',
        genre: filters.genre || '',
        year: filters.year || '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (data.searchTerm) params.set('searchTerm', data.searchTerm);
        if (data.genre) params.set('genre', data.genre);
        if (data.year) params.set('year', data.year);
        
        router.push(`/books?${params.toString()}`);
    };

    return (
        <section className="pt-6 pb-12">
            <div className="container">
                <div className="flex flex-col items-center">
                    <h1 className="lg:text-5xl text-3xl font-semibold leading-snug text-center">
                        Our Collection
                    </h1>
                    <p className="my-3 lg:text-2xl text-xl max-w-[800px] text-center">
                        Explore a vast tapestry of enchanting stories across
                        genres, and immerse yourself in our literary odyssey -
                        All Books await your discovery.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-5 flex flex-col gap-5 max-w-[800px] w-full justify-center items-center rounded-md"
                    >
                        <div className="flex gap-2 w-full justify-center">
                            <input
                                type="text"
                                name="searchTerm"
                                placeholder="Please enter title, author or genre"
                                className="border border-blue-600 px-3 py-2 w-full max-w-[450px] rounded-md"
                                value={data.searchTerm}
                                onChange={(e) =>
                                    setData({...data, searchTerm: e.target.value})
                                }
                            />
                            <input
                                type="number"
                                name="year"
                                placeholder="Publication Year"
                                className="border border-blue-600 pl-3 pr-1 py-2 w-full max-w-[150px] rounded-md"
                                value={data.year}
                                onChange={(e) =>
                                    setData({...data, year: e.target.value})
                                }
                            />
                            <input
                                type="text"
                                name="genre"
                                placeholder="Genre"
                                className="border border-blue-600 px-3 py-2 w-full max-w-[150px] rounded-md"
                                value={data.genre}
                                onChange={(e) =>
                                    setData({...data, genre: e.target.value})
                                }
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <BtnPrimary type="submit">Search</BtnPrimary>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Hero;
