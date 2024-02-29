package com.seoulJJ.hypertube.global.utils.FileManager;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.seoulJJ.hypertube.domain.user.User;
import com.seoulJJ.hypertube.domain.user.UserRepository;
import com.seoulJJ.hypertube.domain.user.exception.UserNotFoundException;
import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.FileException;

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;

import java.net.URL;

@Service
@Log4j2
public class ImageFileManager {

    @Autowired
    private UserRepository userRepository;

    @Value("${spring.file_path.profile_image}")
    private String profileImageDir;

    @Value("${info.web.domain}")
    private String webDomain;

    @Transactional
    public String updateUserProfileImage(MultipartFile file, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());

        // 기존 이미지 삭제
        String oldFileName = extractFileNameFromUrl(user.getImageUrl());
        if (oldFileName != null) {
            deleteFile(profileImageDir, oldFileName);
        }

        // 새로운 이미지 추가
        String newFileName = generateFileName(file, email);
        try {
            saveFile(file, profileImageDir, newFileName);
        } catch (IOException e) {
            throw new FileException("파일 저장에 실패했습니다.", ErrorCode.INTERNAL_SERVER_ERR);
        }

        // 유저 이미지 URL 업데이트
        String newUserImageUrl = "http://" + webDomain + "/images/profile/" + newFileName;
        user.updateImageUrl(newUserImageUrl);
        userRepository.save(user);
        return newUserImageUrl;
    }

    private String saveFile(MultipartFile file, String dirPath, String fileName) throws IOException {
        // 저장할 디렉토리가 없다면 생성
        File uploadDir = new File(profileImageDir);
        if (!uploadDir.exists()) {
            throw new FileException("프로필 이미지 저장 디렉토리가 존재하지 않습니다.", ErrorCode.INTERNAL_SERVER_ERR);
        }

        // 파일을 서버에 저장
        String filePath = dirPath + "/" + fileName;
        File dest = new File(filePath);
        file.transferTo(dest);

        return "File uploaded successfully";
    }

    private void deleteFile(String dirPath, String fileName) {
        File file = new File(dirPath + "/" + fileName);
        if (file.exists()) {
            file.delete();
        }
    }

    private String generateFileName(MultipartFile file, String email) {
        String username = email.substring(0, email.indexOf("@"));
        String contentType = file.getContentType();
        String fileName = StringUtils.cleanPath(
                username + "-" + UUID.randomUUID().toString()
                        + "." + contentType.substring(contentType.lastIndexOf('/') + 1));
        return fileName;
    }

    private String extractFileNameFromUrl(String url) {
        try {
            URL imageUrl = new URL(url);
            String path = imageUrl.getPath();
            return path.substring(path.lastIndexOf('/') + 1);
        } catch (Exception e) {
            return null;
        }
    }
}