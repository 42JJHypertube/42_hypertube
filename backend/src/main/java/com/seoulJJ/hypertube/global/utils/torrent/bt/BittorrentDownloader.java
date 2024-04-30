package com.seoulJJ.hypertube.global.utils.torrent.bt;

import bt.runtime.BtClient;
import bt.runtime.Config;
import bt.torrent.selector.SequentialSelector;
import lombok.extern.log4j.Log4j2;
import bt.dht.DHTModule;
import bt.protocol.crypto.EncryptionPolicy;
import bt.Bt;
import bt.data.Storage;
import bt.data.file.FileSystemStorage;
import bt.dht.DHTConfig;

import static com.seoulJJ.hypertube.global.utils.torrent.bt.DHTModuleBuilder.buildDHTModule;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Security;

import org.springframework.stereotype.Component;

import com.google.inject.Module;

@Component
@Log4j2
public class BittorrentDownloader {

    public void startDownload() {
        Security.setProperty("crypto.policy", "unlimited");
        // enable multithreaded verification of torrent data
        Config config = new Config() {
            @Override
            public int getNumOfHashingThreads() {
                return Runtime.getRuntime().availableProcessors() * 2;
            }

            @Override
            public EncryptionPolicy getEncryptionPolicy() {
                return EncryptionPolicy.PREFER_PLAINTEXT;
            }
        };

        // enable bootstrapping from public routers
        Module dhtModule = new DHTModule(new DHTConfig() {
            @Override
            public boolean shouldUseRouterBootstrap() {
                return true;
            }
        });

        // get download directory
        Path targetDirectory = Paths.get(System.getProperty("user.home"), "/Desktop/42_hypertube/file_storage/movies");
        log.info("TARGETDIRECTORY : " + targetDirectory);
        // create file system based backend for torrent data
        Storage storage = new FileSystemStorage(targetDirectory);

        // create client with a private runtime
        // Scrat magnet:?xt=urn:btih:8CE082224BE3026057F0DB523725F6530939FF3E&dn=Scrat%3A+Spaced+Out+%282016%29+%5B720p%5D+%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce
        BtClient client = Bt.client()
                .config(config)
                .storage(storage)
                .magnet("magnet:?xt=urn:btih:8CE082224BE3026057F0DB523725F6530939FF3E&dn=Scrat%3A+Spaced+Out+%282016%29+%5B720p%5D+%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce")
                .autoLoadModules()
                .module(dhtModule)
                .selector(SequentialSelector.sequential())
                .stopWhenDownloaded()
                .build();

        // launch
        try {
            client.startAsync(state -> {
                
                if (state.getPiecesRemaining() == 0) {
                    client.stop();
                }
                log.info("PIECES REMAINING : " + state.getPiecesRemaining());
                log.info("CONNECTED Peers : " + state.getConnectedPeers());
                log.info("DOWNLOAD : " + state.getDownloaded() + "%");
            }, 1000).join();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
