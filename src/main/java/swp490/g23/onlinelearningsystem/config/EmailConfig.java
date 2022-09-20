package swp490.g23.onlinelearningsystem.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter @Setter 
public class EmailConfig {
    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.port}")
    private int port;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    private JavaMailSenderImpl getMailSender (){
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost(this.getHost());
        sender.setPort(this.getPort());
        sender.setUsername(this.getUsername());
        sender.setPassword(this.getPassword());
        return sender;
    }

    public void sendResetPasswordMail(String toEmail, String mailContent){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("supportteam@support.com");
        mailMessage.setTo(toEmail);
        mailMessage.setSubject("Password reset");
        mailMessage.setText("Here the new password you requested :" +mailContent);

        this.getMailSender().send(mailMessage); 
    }
}
