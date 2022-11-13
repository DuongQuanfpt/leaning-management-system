package swp490.g23.onlinelearningsystem.entities.s3amazon.service;

import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    
    String saveImg(String imgBase64 ,  String imgName) ;

    String saveSubmit(MultipartFile file , String fileName);

    byte[] dowloadFile(String fileName);

    void deteleSubmit(String fileName);
}
