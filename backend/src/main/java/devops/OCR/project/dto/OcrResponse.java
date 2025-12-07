package devops.ocr.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OcrResponse {
    private String status;
    private String text;
    private String message;
}