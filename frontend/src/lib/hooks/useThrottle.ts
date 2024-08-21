import { useState } from "react"

const useThrottle = (ms: number, callback?: any) => {
    const [isWorking, setIsWorking] = useState<boolean>(false)

    const throttleFunc = (arg: any) => {
        if (isWorking) return;

        setIsWorking(true);
        setTimeout(() => {
            if(callback) callback(arg);
            setIsWorking(false);
        }, ms)
    }

    return { throttleFunc }
}

export default useThrottle;