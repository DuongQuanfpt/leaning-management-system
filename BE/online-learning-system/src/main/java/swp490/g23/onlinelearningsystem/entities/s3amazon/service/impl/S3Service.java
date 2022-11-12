package swp490.g23.onlinelearningsystem.entities.s3amazon.service.impl;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import swp490.g23.onlinelearningsystem.entities.s3amazon.service.IFileService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class S3Service implements IFileService {

    @Value("${ama.bucketImage}")
    private String bucketImage;

    @Value("${ama.bucketSubmit}")
    private String bucketSubmit;

    private final Tika tika = new Tika();

    private final AmazonS3 s3;

    public S3Service(AmazonS3 s3) {
        this.s3 = s3;
    }

    @Override
    public String saveImg(String imgBase64, String imgName) {

        try {
            byte[] contents = convertToImage(imgBase64);
            InputStream stream = new ByteArrayInputStream(contents);

            ObjectMetadata meta = new ObjectMetadata();
            meta.setContentLength(contents.length);
            meta.setContentType("image/png");

            PutObjectRequest objectRequest = new PutObjectRequest(bucketImage, imgName, stream, meta)
                    .withCannedAcl(CannedAccessControlList.PublicRead);
            s3.putObject(objectRequest);
            return s3.getUrl(bucketImage, imgName).toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public String saveAssignment(MultipartFile multipartFile, String fileName) {
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(multipartFile.getSize());
            objectMetadata.setContentType(tika.detect(multipartFile.getOriginalFilename()));

            InputStream stream = multipartFile.getInputStream();
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketSubmit, fileName, stream, objectMetadata);
            PutObjectResult putObjectResult = s3.putObject(putObjectRequest);

            // PutObjectResult objectResult = s3.putObject(bucketSubmit, fileName, file);
            return s3.getUrl(bucketSubmit, fileName).toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public byte[] dowloadFile(String fileName) {
        S3Object object = s3.getObject(bucketImage, fileName);
        S3ObjectInputStream inputStream = object.getObjectContent();
        try {
            return IOUtils.toByteArray(inputStream);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            throw new RuntimeException(e);
        }

    }

    @Override
    public void deteleFile(String fileName) {
        s3.deleteObject(bucketImage, fileName);
    }

    public byte[] convertToImage(String base64Image) throws IOException {
        String imageDataBytes = base64Image.split(",")[1];
        byte[] imgBytes = Base64.getDecoder().decode(imageDataBytes);

        return imgBytes;

    }
}
