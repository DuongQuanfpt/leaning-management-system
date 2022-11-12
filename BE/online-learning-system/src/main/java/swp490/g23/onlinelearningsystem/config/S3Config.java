package swp490.g23.onlinelearningsystem.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class S3Config {

    @Value("${ama.accessKey}")
    private String accessKey;

    @Value("${ama.secret}")
    private String secret;

    @Value("${ama.region}")
    private String region;

    @Value("${ama.bucketImage}")
    private String bucket;

    @Bean
    public AmazonS3 s3() {
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secret);

        return AmazonS3ClientBuilder.standard().withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).build();

    }
}
