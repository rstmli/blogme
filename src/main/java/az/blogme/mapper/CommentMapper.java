package az.blogme.mapper;

import az.blogme.dao.entity.CommentEntity;
import az.blogme.dto.request.CreateCommentRequest;
import az.blogme.dto.response.CommentResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CommentMapper {

    public CommentEntity toEntity(CreateCommentRequest dto) {
        return CommentEntity.builder()
                .comment(dto.getComment())
                .rate(dto.getRate())
                .build();
    }

    public CommentResponse toCommentResponse(CommentEntity commentEntity) {
        return new CommentResponse(commentEntity.getComment(),commentEntity.getRate());
    }


    public List<CommentResponse> toCommentResponseList(List<CommentEntity> commentEntityList) {
        return commentEntityList.stream().map(this::toCommentResponse).collect(Collectors.toList());
    }
}
