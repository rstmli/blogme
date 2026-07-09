package az.blogme.service;

import az.blogme.dao.repository.CommentRepository;
import az.blogme.dto.request.CreateCommentRequest;
import az.blogme.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public void save(CreateCommentRequest comment) {
        commentRepository.save(commentMapper.toEntity(comment));
    }
}
