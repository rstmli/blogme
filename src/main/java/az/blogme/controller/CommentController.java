package az.blogme.controller;

import az.blogme.dto.request.CreateCommentRequest;
import az.blogme.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/comment")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/write")
    public void save(@RequestBody @Valid CreateCommentRequest comment) {
        commentService.save(comment);
    }
}
