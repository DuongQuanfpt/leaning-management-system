package swp490.g23.onlinelearningsystem.entities.packages.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.packages.domain.Package;

public interface PackageRepositories extends JpaRepository<Package, Long>{
    
}
