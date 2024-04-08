"use client"

import useToggleState from "@/lib/hooks/useToggleState"
import { useState } from "react"
import { MovieGenres } from "@/types/account/type"

export default function NavGenreSelector() {
    const {state, toggle} = useToggleState()
    const [genre, setGenre] = useState<string | null>(null)
    const [genreParam, setGenreParam] = useState<number | null> (null)
    
    return (
        <div>
            <div>
              <button onClick={() => toggle()}> {genre ? genre : "Genre"} </button>
              <input type="text" placeholder="Search Movie"/>
              <button onClick={() => console.log("move page")}> Serach</button>
            </div>
            { state ?
              MovieGenres.map((genreItem) => (
                <div key={genreItem.id}>
                <input
                  type="checkbox"
                  name={genreItem.name}
                  id={genreItem.name}
                  onChange={() => {setGenre(genreItem.name); setGenreParam(genreItem.id)}}
                />
                <label htmlFor={genreItem.name}>{genreItem.name}</label>
                </div> 
              ))
               :
                null
            }
        </div>    
    )
}