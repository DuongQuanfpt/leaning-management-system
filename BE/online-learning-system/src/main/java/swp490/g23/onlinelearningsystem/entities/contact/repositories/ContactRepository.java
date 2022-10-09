package swp490.g23.onlinelearningsystem.entities.contact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.contact.domain.WebContact;

public interface ContactRepository extends JpaRepository<WebContact, Long> {
    
}
