package com.seoulJJ.hypertube.global.utils.torrent.bt.visearch.service;

import bt.Bt;
import bt.BtClientBuilder;
import bt.data.Storage;
import bt.data.file.FileSystemStorage;
import bt.protocol.crypto.EncryptionPolicy;
import bt.runtime.BtClient;
import bt.runtime.BtRuntime;
import bt.runtime.Config;
import bt.torrent.selector.PieceSelector;
import bt.torrent.selector.SequentialSelector;
import lombok.extern.log4j.Log4j2;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.seoulJJ.hypertube.global.utils.torrent.bt.visearch.config.ConfigConstantsAndMethods.MAGNET_LINK_INITIALIAZED;
import static com.seoulJJ.hypertube.global.utils.torrent.bt.visearch.config.ConfigConstantsAndMethods.MAGNET_LINK_PROCESS_SUCCEEDED;
import static com.seoulJJ.hypertube.global.utils.torrent.bt.visearch.model.DHTModuleBuilder.buildDHTModule;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Security;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Log4j2
public class TorrentDownloadService {
    private static final Log logger = LogFactory.getLog(TorrentDownloadService.class);

    @Autowired
    private SearchForDownloadedContentService searchForDownloadedContentService;

    private ConcurrentHashMap<String, Integer> magnetLinkMap = new ConcurrentHashMap<>();
    private BtClientBuilder clientBuilder;

    TorrentDownloadService() {
        Config config = new Config() {
            @Override
            public int getNumOfHashingThreads() {
                return Runtime.getRuntime().availableProcessors();
            }

            @Override
            public EncryptionPolicy getEncryptionPolicy() {
                return EncryptionPolicy.PREFER_PLAINTEXT;
            }
        };

        BtRuntime runtime = BtRuntime.builder(config)
                .module(buildDHTModule())
                .autoLoadModules()
                .build();
        Path targetDirectory = Paths.get(System.getProperty("user.home"), "/Desktop/42_hypertube/file_storage/movies");
        Storage storage = new FileSystemStorage(targetDirectory);

        PieceSelector selector = SequentialSelector.sequential();

        clientBuilder = Bt.client(runtime)
                .storage(storage)
                .selector(selector);
    }

    public void processDownloadingByMagnetLink(String magnetLink) {
        configureSecurity();

        if (magnetLink != null)
            clientBuilder.magnet(magnetLink);
        else
            throw new IllegalStateException("Torrent file or magnet URI is required");

        // todo: is setting id to each client needed?
        BtClient client = clientBuilder.build();
        logger.info("Starting new bit torrent client...");
        logger.info("New bit torrent client will download files from magnet_link = " + magnetLink);
        client.startAsync(state -> {
            boolean complete = (state.getPiecesRemaining() == 0);
            if (complete) {
                client.stop();
                magnetLinkMap.put(magnetLink, MAGNET_LINK_PROCESS_SUCCEEDED);
                logger.info("Download Completed!");
            }
            if(state.getConnectedPeers().size() != 0)
            {
                log.info("CONNECTED Peers : " + state.getConnectedPeers() + "\n" +
                         "PiecesTotal : " + state.getPiecesTotal() + "\n" +
                         "PiecesComplete : " + state.getPiecesComplete() + "\n" +
                         "PiecesIncomplete : " + state.getPiecesIncomplete() + "\n" +
                         "PiecesNotSkipped : " + state.getPiecesNotSkipped() + "\n" +
                         "PiecesRemaining : " + state.getPiecesRemaining() + "\n" +
                         "Left : " + state.getLeft() + "\n" +
                         "Uploaded : " + state.getUploaded() + "\n" +
                         "Downloaded : " + state.getDownloaded() + "\n" +
                         "DOWNLOAD : " + (double) state.getPiecesComplete() / state.getPiecesTotal() * 100 + "%" + "\n" +
                         "StartedAsSeed : " + state.startedAsSeed());
            }
            // log.info("PIECES REMAINING : " + state.getPiecesRemaining());
            // log.info("CONNECTED Peers : " + state.getConnectedPeers());
            // todo: is it necessary to throw TimeoutException?
        }, 1000).join();

    }

    private static void configureSecurity() {
        String key = "crypto.policy";
        String value = "unlimited";
        try {
            Security.setProperty(key, value);
            Security.setProperty("crypto", value);
        } catch (Exception e) {
            logger.error(String.format("Failed to set security property '%s' to '%s'", key, value), e);
        }
    }

    public void addMagnetToMap(String magnetLink) {
        magnetLinkMap.put(magnetLink, MAGNET_LINK_INITIALIAZED);
    }

    public void changeMagnetLinkStatus(String magnetLink, Integer status) {
        magnetLinkMap.put(magnetLink, status);
    }

    public String getNextInitializedLink() {
        return magnetLinkMap.entrySet().stream()
                .filter(entry -> (entry.getValue() == (int) MAGNET_LINK_INITIALIAZED))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);
    }

}
