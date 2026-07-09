package az.blogme.mapper;

import az.blogme.dao.entity.BlogEntity;
import az.blogme.dto.request.CreateBlogRequest;
import az.blogme.dto.response.BlogResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class BlogMapper {
    private final CommentMapper commentMapper;

    public BlogEntity toBlogEntity(CreateBlogRequest dto) {
        return BlogEntity.builder()
                .author(dto.getAuthor())
                .content(dto.getContent())
                .subject(dto.getSubject())
                .build();

    }

    public BlogResponse toBlogResponse(BlogEntity blogEntity) {
        return BlogResponse.builder()
                .author(blogEntity.getAuthor())
                .subject(blogEntity.getSubject())
                .content(blogEntity.getContent())
                .comments(commentMapper.toCommentResponseList(blogEntity.getComments()))
                .build();
    }

    public List<BlogResponse> toBlogResponseList(List<BlogEntity> blogEntityList) {
        return blogEntityList.stream().map(this::toBlogResponse).collect(Collectors.toList());
    }


}
