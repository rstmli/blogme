package az.blogme.service;

import az.blogme.dao.entity.BlogEntity;
import az.blogme.dao.repository.BlogRepository;
import az.blogme.dto.request.CreateBlogRequest;
import az.blogme.dto.response.BlogResponse;
import az.blogme.mapper.BlogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final BlogMapper blogMapper;


    public void addBLog(CreateBlogRequest dto) {
        BlogEntity blogEntity = blogMapper.toBlogEntity(dto);
        blogRepository.save(blogEntity);
    }

    public List<BlogResponse> showBlogs() {
        return blogMapper.toBlogResponseList(blogRepository.findAll());
    }

}
