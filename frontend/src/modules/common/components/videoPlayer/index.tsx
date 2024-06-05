'use client'

import { useState } from "react";

type MovieState = "NOFILE" | "DOWNLOADING" | "CONVERTING" | "AVAILABLE";

function videoPlayer({ movieState, torrentHash }: { movieState: MovieState; torrentHash: boolean }) {
    const [socket, setSocket] = useState<WebSocket | null> (null)
    const [curState, setCurState] = useState<string> ()

    return (
        <div>
            videoPlayer
        </div>
    )
}

export default videoPlayer
