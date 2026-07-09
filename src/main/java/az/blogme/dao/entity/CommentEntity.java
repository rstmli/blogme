package az.blogme.dao.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "comment")
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(columnDefinition = "TEXT")
    String comment;
    double rate;
    @ManyToOne(fetch = FetchType.LAZY)
    BlogEntity blog;

}
