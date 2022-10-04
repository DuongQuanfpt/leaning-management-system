package swp490.g23.onlinelearningsystem.entities.s3amazon.service.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import swp490.g23.onlinelearningsystem.entities.s3amazon.service.IFileService;

@Service
public class S3Service implements IFileService {

    @Value("${ama.bucketName}")
    private String bucket;

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

            PutObjectRequest objectRequest = new PutObjectRequest(bucket, imgName, stream, meta)
                    .withCannedAcl(CannedAccessControlList.PublicRead);
            s3.putObject(objectRequest);
            return s3.getUrl(bucket, imgName).toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public byte[] dowloadFile(String fileName) {
        S3Object object = s3.getObject(bucket, fileName);
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
        s3.deleteObject(bucket, fileName);
    }

    public byte[] convertToImage(String base64Image) throws IOException {
        String imageDataBytes = base64Image.split(",")[1];
        System.out.println("huhhhh " + imageDataBytes);
        byte[] imgBytes = Base64.getDecoder().decode(imageDataBytes);

        return imgBytes;

    }

}
