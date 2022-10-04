package swp490.g23.onlinelearningsystem.entities.s3amazon.service;

public interface IFileService {
    
    String saveImg(String imgBase64 ,  String imgName) ;

    byte[] dowloadFile(String fileName);

    void deteleFile(String fileName);
}
