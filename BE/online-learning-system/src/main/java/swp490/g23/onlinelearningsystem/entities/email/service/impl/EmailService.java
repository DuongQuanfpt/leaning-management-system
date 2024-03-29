package swp490.g23.onlinelearningsystem.entities.email.service.impl;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;
import swp490.g23.onlinelearningsystem.entities.email.service.IEmailService;

@Service
public class EmailService implements IEmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    // ${spring.mail.username}
    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public void sendSimpleMail(EmailDetails details) {
        // Creating a simple mail message
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        // Setting up necessary details
        mailMessage.setFrom(sender);
        mailMessage.setTo(details.getRecipient());
        mailMessage.setText(details.getMsgBody());
        mailMessage.setSubject(details.getSubject());

        // Sending the mail
        javaMailSender.send(mailMessage);
    }

    @Override
    public void sendMimeMail(EmailDetails details) throws UnsupportedEncodingException, MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,
                MimeMessageHelper.MULTIPART_MODE_MIXED);

        mimeMessageHelper.setFrom(sender, "Support");
        mimeMessageHelper.setTo(details.getRecipient());
        mimeMessageHelper.setSubject(details.getSubject());
        // mimeMessageHelper.setText(details.getMsgBody(), true);
        mimeMessageHelper.setText("<html><body><img src='cid:image1'>" + details.getMsgBody() + "</body></html>", true);
        mimeMessageHelper.addInline("image1", new ClassPathResource("/img/Logo_Dai_hoc_FPT.png"));
        javaMailSender.send(mimeMessage);

    }

}
