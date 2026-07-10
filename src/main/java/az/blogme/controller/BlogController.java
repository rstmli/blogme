package az.blogme.controller;

import az.blogme.dao.repository.CommentRepository;
import az.blogme.dto.request.CreateBlogRequest;
import az.blogme.dto.response.BlogResponse;
import az.blogme.service.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/blog")
@CrossOrigin(origins = "*")
public class BlogController {


    private final BlogService blogService;

    @PostMapping("/add-blog")
    public void save(@RequestBody @Valid CreateBlogRequest blog) {
        blogService.addBLog(blog);
    }
    @GetMapping("/shows-blog")
    public List<BlogResponse> showBlog() {
        return blogService.showBlogs();
    }
}
