package swp490.g23.onlinelearningsystem.entities.s3amazon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.s3amazon.domain.S3File;
import swp490.g23.onlinelearningsystem.entities.s3amazon.service.impl.S3Service;

@RestController
@CrossOrigin
@RequestMapping("/s3")
public class S3Controller {

    @Autowired
    private S3Service s3Service;

    @PostMapping(value = "/upload")
    public ResponseEntity<?> getSettingFilter(@RequestBody S3File file ) {

        return ResponseEntity.ok(s3Service.saveImg(file.getContent(), file.getName()));
    }
}
