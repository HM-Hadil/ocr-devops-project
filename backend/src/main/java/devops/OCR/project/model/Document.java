package devops.ocr.project.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String fileName;
    
    @Column(nullable = false)
    private String filePath;
    
    @Column(nullable = false)
    private String fileType;
    
    @Lob
    @Column(columnDefinition = "TEXT")
    private String extractedText;
    
    @Column(nullable = false)
    private String status; 
    @Column(name = "upload_date")
    private LocalDateTime uploadDate;
    
    @PrePersist
    protected void onCreate() {
        uploadDate = LocalDateTime.now();
        status = "PENDING";
    }
}