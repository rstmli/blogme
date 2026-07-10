package az.blogme.service;

import az.blogme.dao.entity.BlogEntity;
import az.blogme.dao.repository.BlogRepository;
import az.blogme.dao.repository.CommentRepository;
import az.blogme.dto.request.CreateCommentRequest;
import az.blogme.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final BlogRepository blogRepository;
    private final CommentMapper commentMapper;

    public void save(CreateCommentRequest comment) {
        BlogEntity entity = blogRepository.findById(comment.getBlogId()).orElse(null);
        commentRepository.save(commentMapper.toEntity(comment,entity));
    }
}
