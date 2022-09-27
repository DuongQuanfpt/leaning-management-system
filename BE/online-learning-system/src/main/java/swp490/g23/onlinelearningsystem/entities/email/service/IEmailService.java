package swp490.g23.onlinelearningsystem.entities.email.service;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;

import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;

public interface IEmailService {
    void sendSimpleMail(EmailDetails details);
    void sendMimeMail(EmailDetails details) throws UnsupportedEncodingException, MessagingException;
}
