package swp490.g23.onlinelearningsystem.entities.email.service;

import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;

public interface IEmailService {
    String sendSimpleMail(EmailDetails details);
}
