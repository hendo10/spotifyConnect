import React, { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import { getTopArtists } from '../spotify';
import { SectionWrapper, ArtistsGrid, TimeRangeButtons, Loader } from '../components';

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState(null);
    const [activeRange, setActiveRange] = useState("short");

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getTopArtists(`${activeRange}_term`);
            setTopArtists(data);
        };

        catchErrors(fetchData());
    }, [activeRange])

    return (
        <main>   
            {topArtists && topArtists.items ? (
                <SectionWrapper title="Top artists" breadcrumb="true">
                    <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange}/>
                    <ArtistsGrid artists={topArtists.items} />
                </SectionWrapper>
            ) : (
                <Loader />
            )}
        </main>
    )
}

export default TopArtists;