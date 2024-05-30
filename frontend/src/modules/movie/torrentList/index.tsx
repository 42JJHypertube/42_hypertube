'use client'

type torrentInfo = {
    url: string,
    hash: string,
    quality: string,
    type: string,
    is_repack: string,
    video_codec: string,
    bit_depth: string,
    audio_channels: string,
    seeds: number,
    peers: number,
    size: string,
    size_bytes: number,
    date_uploaded: string,
    date_uploaded_unix: number 
}

function parseQuality(quality: string): number {
    const match = quality.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
}

function TorrentList({torrents} : {torrents: torrentInfo[]}) {
    const filteredTorrents = torrents.filter(info => parseQuality(info.quality) <= 2060);
    const sortedTorrents = filteredTorrents.sort((a, b) => {
        const qualityA = parseQuality(a.quality);
        const qualityB = parseQuality(b.quality);

        if (qualityA > qualityB) return -1;
        if (qualityA < qualityB) return 1;

        // Quality가 같을 때 seed 수로 내림차순 정렬
        if (a.seeds < b.seeds) return -1;
        if (a.seeds > b.seeds) return 1;

        return 0;
    });

    return (
        <div>
            {sortedTorrents.map((info: torrentInfo, index: number) => (
                <div key={index}>
                    <p>URL: {info.url}</p>
                    <p>Hash: {info.hash}</p>
                    <p>Quality: {info.quality}</p>
                    <p>Seeds: {info.seeds}</p>
                </div>
            ))}
        </div>
    )
}

export default TorrentList;