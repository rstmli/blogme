package az.blogme.dao.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.w3c.dom.Text;

import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE)

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "blog")
public class BlogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String author;
    String subject;
    double rating;
    @Column(columnDefinition = "TEXT")
    String content;
    @OneToMany(mappedBy = "blog",cascade = CascadeType.ALL)
    List<CommentEntity> comments;
}
