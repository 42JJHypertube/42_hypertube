
// lib/SocketClient.ts
import net from 'net';

class SocketClient {
    private static instance: SocketClient;
    private client: net.Socket;

    constructor(host: string, port: number) {
        this.client = new net.Socket();
        this.client.connect(port, host, () => {
            console.log(`Connected to ${host}:${port}`);
        });

        this.client.on('error', (err) => {
            console.error(`Socket error: ${err}`);
        });

        this.client.on('close', () => {
            console.log('Connection closed');
        });
    }

    public static getInstance(host: string, port: number): SocketClient {
        if (!SocketClient.instance) {
            SocketClient.instance = new SocketClient(host, port);
        }
        return SocketClient.instance;
    }

    public send(message: string): void {
        this.client.write(message);
        console.log(`Sent: ${message}`);
    }

    public receive(callback: (data: string) => void): void {
        this.client.on('data', (data) => {
            console.log(`Received: ${data}`);
            callback(data.toString());
        });
    }

    public close(): void {
        this.client.destroy();
        console.log('Socket closed');
    }
}

export default SocketClient;
