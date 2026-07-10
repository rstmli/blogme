package az.blogme.dto.request;

import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.validation.annotation.Validated;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Validated
public class CreateCommentRequest {
    Long blogId;
    @NotBlank
    String comment;
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "5.0")
    double rate;
}


