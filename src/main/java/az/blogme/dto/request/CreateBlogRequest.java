package az.blogme.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.validation.annotation.Validated;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Validated
public class CreateBlogRequest {
    @NotBlank
    String author;
    @NotBlank
    @Size(min = 1, max = 32)
    String subject;
    @NotBlank
            @Size(min = 1, max = 1024)
    String content;
}
